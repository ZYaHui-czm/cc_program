import sharp from 'sharp';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const svgPath = resolve(rootDir, 'public', 'favicon.svg');

async function generate() {
  const svgBuffer = readFileSync(svgPath);

  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(resolve(rootDir, 'public', 'icons', 'icon-192.png'));

  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(resolve(rootDir, 'public', 'icons', 'icon-512.png'));

  console.log('Icons generated successfully!');
}

generate().catch(console.error);
