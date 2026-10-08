"use server";

import { z } from "zod";
import nodemailer from "nodemailer";
import { headers } from "next/headers";

// In-memory sliding window rate limiter: max 5 submissions per 60 seconds per IP
const rateLimitMap = new Map<string, { count: number; firstReq: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

async function checkRateLimitAndCsrf(): Promise<{ allowed: boolean; error?: string }> {
  try {
    const reqHeaders = await headers();

    // 1. CSRF Origin Verification
    const origin = reqHeaders.get("origin");
    const host = reqHeaders.get("host");
    if (origin && host) {
      try {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
          return { allowed: false, error: "Ungültige Anfragequelle (CSRF Schutz)." };
        }
      } catch {}
    }

    // 2. Server-Side IP Rate Limiting
    const forwarded = reqHeaders.get("x-forwarded-for");
    const realIp = reqHeaders.get("x-real-ip");
    const ip = (forwarded ? forwarded.split(",")[0].trim() : realIp) || "127.0.0.1";

    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (rateLimitMap.size > 500) {
      for (const [key, val] of rateLimitMap.entries()) {
        if (now - val.firstReq > RATE_LIMIT_WINDOW_MS) rateLimitMap.delete(key);
      }
    }

    if (!entry || now - entry.firstReq > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.set(ip, { count: 1, firstReq: now });
      return { allowed: true };
    }

    if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
      return {
        allowed: false,
        error: "Zu viele Anfragen. Bitte warten Sie einen Moment vor dem nächsten Absenden.",
      };
    }

    entry.count += 1;
    return { allowed: true };
  } catch {
    return { allowed: true };
  }
}

/** Escape HTML entities to prevent XSS in email templates */
function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const valuationSchema = z.object({
  intent: z.string().trim().min(1, "Bitte wählen Sie Ihr Anliegen").max(30),
  timeframe: z.string().trim().min(1, "Bitte wählen Sie den Zeitrahmen").max(50),
  location: z.string().trim().min(2, "Bitte geben Sie einen gültigen Ort ein").max(100),
  name: z.string().trim().min(2, "Name ist zu kurz").max(80),
  contact: z.string().trim().min(5, "Kontaktangabe ist zu kurz").max(120),
  website: z.string().max(0).optional(), // Honeypot
});

const contactSchema = z.object({
  firstName: z.string().trim().min(2, "Vorname ist zu kurz").max(50),
  lastName: z.string().trim().min(2, "Nachname ist zu kurz").max(50),
  email: z.string().trim().email("Bitte geben Sie eine gültige E-Mail-Adresse ein").max(100),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v === "" || /^[+()\-.\s\d]{5,30}$/.test(v), {
      message: "Bitte geben Sie eine gültige Telefonnummer ein",
    })
    .optional(),
  message: z.string().trim().min(10, "Nachricht ist zu kurz (min. 10 Zeichen)").max(2000),
  website: z.string().max(0).optional(), // Honeypot
});

// Singleton transporter — reused across hot-reloads in dev
let _transporter: ReturnType<typeof nodemailer.createTransport> | null = null;
function getTransporter() {
  if (_transporter) return _transporter;
  const host = process.env.SMTP_HOST || "mail.infomaniak.com";
  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = process.env.SMTP_SECURE !== undefined
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

  _transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER || "info@optimal-immobilien.ch",
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  return _transporter;
}

interface SendMailOptions {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}

async function sendMailInternal(opts: SendMailOptions) {
  // Option A: Resend API (HTTPS REST — ideal for Vercel/serverless)
  if (process.env.RESEND_API_KEY) {
    const toList = opts.to.split(",").map((s) => s.trim()).filter(Boolean);
    const fromAddress =
      process.env.RESEND_FROM ||
      process.env.EMAIL_FROM ||
      opts.from;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: toList,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
        subject: opts.subject,
        text: opts.text,
        html: opts.html,
      }),
    });
    if (!res.ok) {
      const errBody = await res.text();
      console.error(`[Resend API Error]: ${res.status}`, errBody);
      throw new Error(`Resend API error: ${res.status} ${errBody}`);
    }
    return;
  }

  // Option B: SMTP via nodemailer (Infomaniak or custom host)
  if (process.env.SMTP_PASS) {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: opts.from,
      to: opts.to,
      replyTo: opts.replyTo,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    });
    return;
  }

  // Option C: Local development fallback / simulation when credentials not set
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Email Service Notice] Email simulated in local development environment.`);
  }
}

export async function submitValuation(data: unknown) {
  // 1. Security: Server-side Rate Limiting & CSRF Validation
  const guard = await checkRateLimitAndCsrf();
  if (!guard.allowed) {
    return { error: guard.error || "Anfrage vorübergehend blockiert." };
  }

  // 2. Strict Server-Side Validation (Zero-Trust)
  const parsed = valuationSchema.safeParse(data);

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { error: first?.message || "Ungültige Eingaben. Bitte überprüfen Sie das Formular." };
  }

  // 3. Anti-Bot Honeypot Validation
  if (parsed.data.website && parsed.data.website.length > 0) {
    // Fake success to fool bots
    return { success: true };
  }

  const { intent, timeframe, location, name, contact } = parsed.data;

  // Extract email address if provided in contact field
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const emailMatch = contact.match(emailRegex);
  const customerEmail = emailMatch ? emailMatch[0] : null;

  const toAddress =
    process.env.CONTACT_TO ||
    "optimal.immobilien@outlook.com, info@optimal-immobilien.ch";
  const fromUser = process.env.SMTP_USER || "info@optimal-immobilien.ch";

  try {
    // 3. Send lead notification to Optimal Immobilien
    await sendMailInternal({
      from: `"Optimal Immobilien – Formular" <${fromUser}>`,
      to: toAddress,
      replyTo: customerEmail || undefined,
      subject: `Neue Immobilien-Anfrage: ${name} (${intent} in ${location})`,
      text: [
        `Neue Anfrage über das Webseiten-Formular:`,
        ``,
        `Name:          ${name}`,
        `Anliegen:      ${intent}`,
        `Region / Ort:  ${location}`,
        `Zeitrahmen:    ${timeframe}`,
        `Kontakt:       ${contact}`,
        ``,
        `Datum / Zeit:  ${new Date().toLocaleString("de-CH", { timeZone: "Europe/Zurich" })}`,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;font-size:15px;color:#1a1a1a;max-width:600px;line-height:1.5">
          <h2 style="color:#1a1a1a;border-bottom:2px solid #b8975a;padding-bottom:8px">Neue Anfrage über das Webseiten-Formular</h2>
          <table style="width:100%;border-collapse:collapse;margin-top:16px">
            <tr><td style="padding:8px 0;width:140px"><strong>Name:</strong></td><td>${esc(name)}</td></tr>
            <tr><td style="padding:8px 0"><strong>Anliegen:</strong></td><td><span style="background:#f5f0e8;padding:3px 8px;font-weight:600">${esc(intent)}</span></td></tr>
            <tr><td style="padding:8px 0"><strong>Region / Ort:</strong></td><td>${esc(location)}</td></tr>
            <tr><td style="padding:8px 0"><strong>Zeitrahmen:</strong></td><td>${esc(timeframe)}</td></tr>
            <tr><td style="padding:8px 0"><strong>Kontakt:</strong></td><td><strong>${esc(contact)}</strong></td></tr>
          </table>
          <p style="margin-top:24px;font-size:12px;color:#777">Gesendet über optimal-immobilien.ch</p>
        </div>
      `,
    });

    // 4. Send auto-reply to customer if an email was provided
    if (customerEmail) {
      await sendMailInternal({
        from: `"Optimal Immobilien AG" <${fromUser}>`,
        to: customerEmail,
        subject: "Ihre Anfrage wurde erhalten – Optimal Immobilien AG",
        text: `Guten Tag ${name},\n\nVielen Dank für Ihre Anfrage bezüglich "${intent}" in ${location}.\n\nWir haben Ihre Angaben erhalten und ein Makler unseres Teams wird Ihre Anfrage prüfen und sich innerhalb von 24 Stunden persönlich bei Ihnen melden.\n\nIhre Angaben im Überblick:\n- Anliegen: ${intent}\n- Region / Ort: ${location}\n- Zeitrahmen: ${timeframe}\n- Kontakt: ${contact}\n\nMit freundlichen Grüssen\nOptimal Immobilien AG\nTel: +41 43 540 82 27\ninfo@optimal-immobilien.ch\nwww.optimal-immobilien.ch`,
        html: `
          <div style="font-family:Arial,sans-serif;font-size:15px;color:#1a1a1a;max-width:600px;line-height:1.5">
            <p>Guten Tag ${esc(name)},</p>
            <p>Vielen Dank für Ihre Anfrage bezüglich <strong>${esc(intent)}</strong> in <strong>${esc(location)}</strong>.</p>
            <p>Wir haben Ihre Angaben erhalten und melden uns <strong>innerhalb von 24 Stunden</strong> persönlich bei Ihnen.</p>
            <div style="background:#f5f0e8;border-left:4px solid #b8975a;padding:16px;margin:20px 0">
              <strong style="display:block;margin-bottom:8px">Ihre Angaben:</strong>
              <div>• <strong>Anliegen:</strong> ${esc(intent)}</div>
              <div>• <strong>Region / Ort:</strong> ${esc(location)}</div>
              <div>• <strong>Zeitrahmen:</strong> ${esc(timeframe)}</div>
              <div>• <strong>Kontaktangabe:</strong> ${esc(contact)}</div>
            </div>
            <p style="margin-top:24px">Mit freundlichen Grüssen<br>
            <strong>Optimal Immobilien AG</strong><br>
            Tel: <a href="tel:+41435408227">+41 43 540 82 27</a><br>
            E-Mail: <a href="mailto:info@optimal-immobilien.ch">info@optimal-immobilien.ch</a><br>
            <a href="https://www.optimal-immobilien.ch">www.optimal-immobilien.ch</a></p>
          </div>
        `,
      }).catch((err: unknown) => console.error("[Valuation Auto-reply error]", err));
    }
  } catch (err: unknown) {
    console.error("[Valuation lead error]", err);
    return { error: "E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder rufen Sie uns direkt unter +41 43 540 82 27 an." };
  }

  return { success: true };
}

export async function submitContact(data: unknown) {
  // 1. Security: Server-side Rate Limiting & CSRF Validation
  const guard = await checkRateLimitAndCsrf();
  if (!guard.allowed) {
    return { error: guard.error || "Anfrage vorübergehend blockiert." };
  }

  // 2. Strict Server-Side Validation (Zero-Trust)
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { error: first?.message || "Ungültige Eingaben. Bitte überprüfen Sie das Formular." };
  }

  // 3. Anti-Bot Honeypot Validation
  if (parsed.data.website && parsed.data.website.length > 0) {
    // Fake success to fool bots
    return { success: true };
  }

  const { firstName, lastName, email, phone, message } = parsed.data;
  const toAddress =
    process.env.CONTACT_TO ||
    "optimal.immobilien@outlook.com, info@optimal-immobilien.ch";
  const fromUser = process.env.SMTP_USER || "info@optimal-immobilien.ch";

  // 3. Send email to Optimal Immobilien
  try {
    await sendMailInternal({
      from: `"Optimal Immobilien – Kontaktformular" <${fromUser}>`,
      to: toAddress,
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${firstName} ${lastName}`,
      text: [
        `Name:       ${firstName} ${lastName}`,
        `E-Mail:     ${email}`,
        `Telefon:    ${phone || "–"}`,
        ``,
        `Nachricht:`,
        message,
      ].join("\n"),
      html: `
        <table style="font-family:Arial,sans-serif;font-size:15px;color:#1a1a1a;max-width:600px">
          <tr><td style="padding:24px 0 8px"><strong>Name</strong></td><td>${esc(firstName)} ${esc(lastName)}</td></tr>
          <tr><td style="padding:8px 0"><strong>E-Mail</strong></td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
          <tr><td style="padding:8px 0"><strong>Telefon</strong></td><td>${esc(phone || "–")}</td></tr>
          <tr><td colspan="2" style="padding:20px 0 8px"><strong>Nachricht</strong></td></tr>
          <tr><td colspan="2" style="background:#f5f0e8;padding:16px;border-left:4px solid #b8975a;white-space:pre-wrap">${esc(message)}</td></tr>
        </table>
      `,
    });

    // 4. Send auto-reply to sender
    await sendMailInternal({
      from: `"Optimal Immobilien AG" <${fromUser}>`,
      to: email,
      subject: "Ihre Nachricht wurde erhalten – Optimal Immobilien AG",
      text: `Guten Tag ${firstName},\n\nVielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.\n\nMit freundlichen Grüssen\nOptimal Immobilien AG\nTel: +41 43 540 82 27\nwww.optimal-immobilien.ch`,
      html: `
        <div style="font-family:Arial,sans-serif;font-size:15px;color:#1a1a1a;max-width:600px">
          <p>Guten Tag ${esc(firstName)},</p>
          <p>Vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und melden uns <strong>innerhalb von 24 Stunden</strong> bei Ihnen.</p>
          <p style="margin-top:24px">Mit freundlichen Grüssen<br>
          <strong>Optimal Immobilien AG</strong><br>
          Tel: <a href="tel:+41435408227">+41 43 540 82 27</a><br>
          <a href="https://www.optimal-immobilien.ch">www.optimal-immobilien.ch</a></p>
        </div>
      `,
    }).catch((err: unknown) => console.error("[Contact Auto-reply error]", err));
  } catch (err: unknown) {
    console.error("[Contact SMTP error]", err);
    return { error: "E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder rufen Sie uns direkt unter +41 43 540 82 27 an." };
  }

  return { success: true };
}
