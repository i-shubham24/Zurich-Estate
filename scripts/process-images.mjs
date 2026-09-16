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

// Process Birchwil Visualisierungen
if (existsSync(`${RAW}/birchwil_vis_page_1.png`)) {
  await sharp(`${RAW}/birchwil_vis_page_1.png`)
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(`${OUT}/birchwil-residenz-aussenansicht-1.jpg`);
}
if (existsSync(`${RAW}/birchwil_vis_page_2.png`)) {
  await sharp(`${RAW}/birchwil_vis_page_2.png`)
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(`${OUT}/birchwil-residenz-aussenansicht-2.jpg`);
}

// Process Birchwil Floor Plan
if (existsSync(`${RAW}/birchwil_grundriss_page_1.png`)) {
  await sharp(`${RAW}/birchwil_grundriss_page_1.png`)
    .trim()
    .resize({ width: 2600, withoutEnlargement: true })
    .png({ quality: 90, compressionLevel: 8 })
    .toFile(`${OUT}/birchwil-grundriss-erdgeschoss.png`);
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
