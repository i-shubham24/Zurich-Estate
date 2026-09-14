"use server";

import { z } from "zod";

const valuationSchema = z.object({
  intent: z.string().min(1, "Bitte wählen Sie Ihr Anliegen"),
  timeframe: z.string().min(1, "Bitte wählen Sie den Zeitrahmen"),
  location: z.string().min(2, "Bitte geben Sie einen gültigen Ort ein").max(100),
  name: z.string().min(2, "Name ist zu kurz").max(80),
  contact: z.string().min(5, "Kontaktangabe ist zu kurz").max(120),
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

  console.log("Secure lead processed:", parsed.data);
  return { success: true };
}
