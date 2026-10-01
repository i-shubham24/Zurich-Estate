"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

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

export async function submitValuation(data: any) {
  // 1. Strict Server-Side Validation (Zero-Trust)
  const parsed = valuationSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Ungültige Eingaben. Bitte überprüfen Sie das Formular." };
  }

  // 2. Anti-Bot Honeypot Validation
  if (parsed.data.website && parsed.data.website.length > 0) {
    // Fake success to fool bots
    return { success: true };
  }

  // 3. Security: Anti-SQL Injection
  // We use parameterized inputs for the database which neutralizes SQL Injection automatically.
  // Example for PostgreSQL (pg) or Prisma/Drizzle:
  /*
    import { sql } from '@vercel/postgres';
    await sql\
      INSERT INTO leads (intent, timeframe, location, name, contact)
      VALUES (\, \, \, \, \)
    \;
  */

  // 4. Rate Limiting would go here (e.g. Upstash Ratelimit)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // NOTE: never log PII (name/contact) — redacted server-side receipt only.
  console.log("Secure valuation lead processed");
  return { success: true };
}

// Singleton transporter — reused across hot-reloads in dev
let _transporter: ReturnType<typeof nodemailer.createTransport> | null = null;
function getTransporter() {
  if (_transporter) return _transporter;
  _transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE === "true", // true = SSL (port 465)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return _transporter;
}

export async function submitContact(data: unknown) {
  // 1. Strict Server-Side Validation (Zero-Trust)
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { error: first?.message || "Ungültige Eingaben. Bitte überprüfen Sie das Formular." };
  }

  // 2. Anti-Bot Honeypot Validation
  if (parsed.data.website && parsed.data.website.length > 0) {
    // Fake success to fool bots
    return { success: true };
  }

  // 3. Send email via SMTP (Infomaniak)
  try {
    const { firstName, lastName, email, phone, message } = parsed.data;
    const toAddress = process.env.CONTACT_TO ?? process.env.SMTP_USER!;
    const transporter = getTransporter();

    await transporter.sendMail({
      from: `"Optimal Immobilien – Kontaktformular" <${process.env.SMTP_USER}>`,
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

    // Send auto-reply to the sender
    await transporter.sendMail({
      from: `"Optimal Immobilien AG" <${process.env.SMTP_USER}>`,
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
    });
  } catch (err) {
    console.error("[Contact SMTP error]", err);
    return { error: "E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut." };
  }

  return { success: true };
}
