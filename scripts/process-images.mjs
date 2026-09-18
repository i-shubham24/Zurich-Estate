import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";

const RAW = "_rawimages";
const ASSETS = "src/assets";
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
  if (!existsSync(`${RAW}/${src}`)) continue;
  const input = sharp(`${RAW}/${src}`).rotate();
  await input
    .clone()
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(`${OUT}/${name}.jpg`);
  const meta = await sharp(`${OUT}/${name}.jpg`).metadata();
  console.log(`${name}.jpg  ${meta.width}x${meta.height}`);
}

// Process Birchwil Visualisierungen.
// NOTE: extracts crop away the architects' footer caption strips and sheet
// margins (fractions of the resized image, so any source aspect still works).
if (existsSync(`${RAW}/birchwil_vis_page_1.png`)) {
  const buf = await sharp(`${RAW}/birchwil_vis_page_1.png`)
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();
  const meta = await sharp(buf).metadata();
  const w = meta.width, h = meta.height;
  await sharp(buf)
    .extract({
      left: Math.round(w * 0.033), top: Math.round(h * 0.024),
      width: Math.round(w * 0.933), height: Math.round(h * 0.872),
    })
    .toFile(`${OUT}/birchwil-pool-skizze.jpg`);
}
if (existsSync(`${RAW}/birchwil_vis_page_2.png`)) {
  const buf = await sharp(`${RAW}/birchwil_vis_page_2.png`)
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();
  const meta = await sharp(buf).metadata();
  const w = meta.width, h = meta.height;
  await sharp(buf)
    .extract({
      left: Math.round(w * 0.025), top: Math.round(h * 0.035),
      width: Math.round(w * 0.95), height: Math.round(h * 0.607),
    })
    .toFile(`${OUT}/birchwil-fassade-visualisierung.jpg`);
}

// Process Birchwil Floor Plan (trim sheet margins + drop title/caption block)
if (existsSync(`${RAW}/birchwil_grundriss_page_1.png`)) {
  const buf = await sharp(`${RAW}/birchwil_grundriss_page_1.png`)
    .trim()
    .resize({ width: 2600, withoutEnlargement: true })
    .png({ quality: 90, compressionLevel: 8 })
    .toBuffer();
  const meta = await sharp(buf).metadata();
  const w = meta.width, h = meta.height;
  await sharp(buf)
    .extract({
      left: Math.round(w * 0.046), top: Math.round(h * 0.211),
      width: Math.round(w * 0.939), height: Math.round(h * 0.676),
    })
    .toFile(`${OUT}/birchwil-grundriss-eg.png`);
}

// Process Nürensdorf real site photos
if (existsSync(`${ASSETS}/Neubau Bilder Nürensdorf (2).jpeg`)) {
  await sharp(`${ASSETS}/Neubau Bilder Nürensdorf (2).jpeg`)
    .rotate()
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(`${OUT}/nuerensdorf-baustelle-uebersicht.jpg`);
}
if (existsSync(`${ASSETS}/Bilder Neubau Nürensdorf.jpeg`)) {
  await sharp(`${ASSETS}/Bilder Neubau Nürensdorf.jpeg`)
    .rotate()
    .resize({ width: 2000, withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(`${OUT}/nuerensdorf-baustelle-kran.jpg`);
}
if (existsSync(`${ASSETS}/Neubau Bilder Nürensdorf.jpeg`)) {
  await sharp(`${ASSETS}/Neubau Bilder Nürensdorf.jpeg`)
    .rotate()
    .resize({ width: 2000, withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(`${OUT}/nuerensdorf-baustelle-bauwerk.jpg`);
}

// Optimize the brand logo
if (existsSync(`${RAW}/Optimal Immobilien Logo Bild.png`)) {
  await sharp(`${RAW}/Optimal Immobilien Logo Bild.png`)
    .resize({ width: 600, withoutEnlargement: true })
    .png({ quality: 90 })
    .toFile(`${BRAND}/optimal-immobilien-logo.png`);
}

console.log("All project images processed.");
