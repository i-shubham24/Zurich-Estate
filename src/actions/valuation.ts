"use server";

import { z } from "zod";

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

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // NOTE: never log PII (name/email/message) — redacted server-side receipt only.
  console.log("Secure contact lead processed");
  return { success: true };
}
