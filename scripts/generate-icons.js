import { writeFileSync } from 'fs';
import { deflateSync } from 'zlib';

function createPNG(size) {
  const pixels = Buffer.alloc(size * size * 4);
  const half = Math.floor(size / 2);
  const thick = Math.floor(size / 8);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const cx = x - half;
      const cy = y - half;
      const inCross = Math.abs(cx) < thick || Math.abs(cy) < thick;
      const inDiamond = Math.abs(cx) + Math.abs(cy) < thick * 4;

      if (inCross || inDiamond) {
        pixels[i] = 255;
        pixels[i + 1] = 255;
        pixels[i + 2] = 255;
        pixels[i + 3] = 255;
      } else {
        pixels[i] = 37;
        pixels[i + 1] = 99;
        pixels[i + 2] = 235;
        pixels[i + 3] = 255;
      }
    }
  }
  return pixels;
}

function crc32(buf) {
  let crc = 0xffffffff;
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const combined = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(combined));
  return Buffer.concat([len, combined, crcBuf]);
}

function makeIcon(size, filepath) {
  const raw = createPNG(size);
  const filtered = Buffer.alloc(size * (1 + size * 4));
  for (let y = 0; y < size; y++) {
    filtered[y * (1 + size * 4)] = 0;
    raw.copy(filtered, y * (1 + size * 4) + 1, y * size * 4, (y + 1) * size * 4);
  }

  const compressed = deflateSync(filtered);

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0);
  ihdrData.writeUInt32BE(size, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const png = Buffer.concat([
    signature,
    pngChunk('IHDR', ihdrData),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);

  writeFileSync(filepath, png);
  console.log(`Generated ${filepath} (${size}x${size})`);
}

makeIcon(192, 'public/icons/icon-192.png');
makeIcon(512, 'public/icons/icon-512.png');
