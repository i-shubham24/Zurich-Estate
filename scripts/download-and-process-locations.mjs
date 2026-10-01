import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const targets = [
  {
    slug: 'kuesnacht',
    filename: 'kusnacht.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/2/29/Blick_vom_Z%C3%BCrichsee_auf_K%C3%BCsnacht_%282009%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/6/68/Albis_-_Z%C3%BCrichsee_-_K%C3%BCsnacht_-_Forch_IMG_3297.JPG'
    ]
  },
  {
    slug: 'zollikon',
    filename: 'zollikon.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/3/33/Zollikon_Z%C3%BCrich_DJI.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Zollikon_Kirche.jpg'
    ]
  },
  {
    slug: 'herrliberg',
    filename: 'herrliberg.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/2/29/Blick_vom_Z%C3%BCrichsee_auf_Herrliberg_%282009%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/2c/Herrliberg_-_Z%C3%BCrichsee_2010-08-08_18-34-04.JPG'
    ]
  },
  {
    slug: 'horgen',
    filename: 'horgen.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/7/75/Horgen_-_Zimmerberg_-_Helvetia_2015-09-09_17-38-48.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/9/92/Horgen_-_Z%C3%BCrichsee_2010-06-01_17-34-22.JPG'
    ]
  },
  {
    slug: 'waedenswil',
    filename: 'wadenswil.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/6/6b/Au_-_Schloss_-_ZSG_Helvetia_2015-09-09_17-28-59.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/a/ac/W%C3%A4denswil_-_Z%C3%BCrichsee_IMG_8380.JPG'
    ]
  },
  {
    slug: 'kilchberg',
    filename: 'kilchberg.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/7/7b/Kilchberg_Panorama.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/e/ef/Kilchberg_vom_See.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/9/98/Z%C3%BCrichsee_-_Kilchberg_IMG_2067.JPG'
    ]
  },
  {
    slug: 'uster',
    filename: 'uster.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/e/e5/Uster_Schloss_und_Kirche.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/2d/Uster_-_Schloss_und_Scheune_-_Plateau_2015-09-20_15-37-35.JPG'
    ]
  },
  {
    slug: 'duebendorf',
    filename: 'dubendorf.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/0/00/D%C3%BCbendorf_-_Gemeindeverwaltung-Stadthaus_%28alt%29_IMG_1048_ShiftN.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/4/4c/Hochbord.jpg'
    ]
  },
  {
    slug: 'wallisellen',
    filename: 'wallisellen.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/2/2c/Wallisellen_with_Glatt_Center.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/04/Wallisellen_-_Glatttalbahn_-_Glattzentrum_2011-06-23_16-55-18_ShiftN.jpg'
    ]
  },
  {
    slug: 'zumikon',
    filename: 'zumikon.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/5/51/Zumikon.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/c/c9/Zumikon_von_Norden.JPG'
    ]
  },
  {
    slug: 'meilen',
    filename: 'meilen.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/e/e5/Blick_vom_Z%C3%BCrichsee_auf_Meilen_%282009%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/f/f9/Z%C3%BCrichsee_-_Meilen_IMG_2643.jpg'
    ]
  },
  {
    slug: 'erlenbach',
    filename: 'erlenbach.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/2/2f/Blick_vom_Z%C3%BCrichsee_auf_Erlenbach_%282009%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/03/Z%C3%BCrichsee_-_Erlenbach_IMG_2635.jpg'
    ]
  }
];

const outDir = path.join(process.cwd(), 'public', 'locations');

async function downloadBuffer(url) {
  const cleanUrl = url.split('?')[0];
  const res = await fetch(cleanUrl, {
    headers: {
      'User-Agent': 'SwissEstateBot/1.0 (info@optimal-immobilien.ch)'
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function run() {
  console.log('Downloading and optimizing HD location images...');
  for (const t of targets) {
    let success = false;
    for (const url of t.urls) {
      try {
        console.log(`Downloading ${t.slug} from ${url.substring(0, 70)}...`);
        const buf = await downloadBuffer(url);
        const dest = path.join(outDir, t.filename);
        
        await sharp(buf)
          .rotate()
          .resize({ width: 2400, height: 1350, fit: 'cover', position: 'center' })
          .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:4:4' })
          .toFile(dest);

        const meta = await sharp(dest).metadata();
        const stat = fs.statSync(dest);
        console.log(`✓ Saved ${t.filename} (${meta.width}x${meta.height}, ${Math.round(stat.size / 1024)} KB)`);
        success = true;
        break;
      } catch (err) {
        console.warn(`  Failed URL ${url}: ${err.message}. Trying next fallback...`);
      }
    }
    if (!success) {
      console.error(`✗ ERROR: Could not process ${t.slug}`);
    }
  }
  console.log('Done downloading and processing location images!');
}

run();
