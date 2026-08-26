import sharp from "sharp";
import { mkdirSync } from "node:fs";

const RAW = "_rawimages";
const OUT = "public/projekte";
const BRAND = "public/brand";
mkdirSync(OUT, { recursive: true });
mkdirSync(BRAND, { recursive: true });

// Map raw render files -> clean, SEO-friendly filenames
const jobs = [
  ["1513-Extern-REV4-Perspective1.png New.png", "residenz-aussenansicht-1"],
  ["1513-Extern-REV4-Perspective2.png", "residenz-aussenansicht-2"],
  ["1513-Intern-Attika_Cam1_REV. New.png", "attika-kueche-seeblick"],
  ["1513-Intern-Attika_Cam2_DEF.png", "attika-wohnen-1"],
  ["1513-Intern-Attika_Cam2_REV. new.png", "attika-wohnen-2"],
  ["1513-Intern-Attika_Cam3_REV. new.png", "attika-wohnen-3"],
  ["1513-Intern-EG_Cam1_REV2.png New.png", "erdgeschoss-wohnbereich"],
  ["1513-Intern-OG_Cam1_REV2.png New.png", "obergeschoss-wohnbereich"],
];

for (const [src, name] of jobs) {
  const input = sharp(`${RAW}/${src}`).rotate();
  // Full-quality web hero source (next/image downsizes further per breakpoint)
  await input
    .clone()
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(`${OUT}/${name}.jpg`);
  const meta = await sharp(`${OUT}/${name}.jpg`).metadata();
  console.log(`${name}.jpg  ${meta.width}x${meta.height}`);
}

// Optimize the brand logo (transparent-friendly PNG kept, plus a trimmed copy)
await sharp("_rawimages/Optimal Immobilien Logo Bild.png")
  .resize({ width: 600, withoutEnlargement: true })
  .png({ quality: 90 })
  .toFile(`${BRAND}/optimal-immobilien-logo.png`);

console.log("Images processed.");
