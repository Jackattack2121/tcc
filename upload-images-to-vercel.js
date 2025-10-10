import { put } from '@vercel/blob';
import fg from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const FOLDER = './public/images';
const date = new Date().toISOString().split('T')[0]; // e.g., 2025-10-10
const PREFIX = `gallery/${date}/`;
const PUBLIC = true;

async function run() {
  // Check if folder exists
  if (!fs.existsSync(FOLDER)) {
    console.error(`❌ Error: Folder ${FOLDER} does not exist!`);
    console.log(`Please create the folder or update the FOLDER path in the script.`);
    process.exit(1);
  }

  const files = await fg(['**/*.{jpg,jpeg,png,webp,gif,svg}'], { cwd: FOLDER, caseSensitiveMatch: false });
  
  if (files.length === 0) {
    console.log(`⚠️  No image files found in ${FOLDER}`);
    process.exit(0);
  }

  const results = [];

  console.log(`\n🚀 Uploading ${files.length} images from ${FOLDER} to Vercel Blob Storage...`);
  console.log(`📁 Prefix: ${PREFIX}\n`);

  for (const rel of files) {
    const abs = path.join(FOLDER, rel);
    const file = fs.readFileSync(abs);
    const key = PREFIX + rel.replaceAll('\\', '/');

    try {
      const res = await put(key, file, {
        access: PUBLIC ? 'public' : 'private',
        addRandomSuffix: false,
      });

      results.push({ filename: rel, url: res.url });
      console.log(`✅ ${rel} → ${res.url}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${rel}:`, error.message);
    }
  }

  // Write output files
  fs.writeFileSync('uploaded.json', JSON.stringify({ blobs: results, uploadDate: date, totalFiles: results.length }, null, 2));
  fs.writeFileSync('urls.txt', results.map(r => r.url).join('\n'));
  fs.writeFileSync('urls.csv', 'filename,url\n' + results.map(r => `"${r.filename}","${r.url}"`).join('\n'));

  console.log(`\n🎉 Upload complete! ${results.length} files uploaded.`);
  console.log('→ Created uploaded.json, urls.txt, and urls.csv in project root.');
}

run().catch(err => { 
  console.error('❌ Upload failed:', err); 
  process.exit(1); 
});
