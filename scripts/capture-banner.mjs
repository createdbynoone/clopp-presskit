import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const DURATION_MS = 7500;
const VIEWPORT_W  = 390;
const VIEWPORT_H  = 844;
const FRAMES_DIR  = '/tmp/morph-frames';

if (!existsSync(FRAMES_DIR)) mkdirSync(FRAMES_DIR, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: VIEWPORT_W, height: VIEWPORT_H, deviceScaleFactor: 1 });

// Spoof desktop UA — get full liquid morph, not mobile fallback
await page.setUserAgent(
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
);

console.log('Loading page...');
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 800));

// CDP Screencast — captures frames as the browser composites them
const cdp = await page.createCDPSession();
const frames = [];

await cdp.send('Page.startScreencast', {
  format:         'jpeg',
  quality:        90,
  maxWidth:       VIEWPORT_W,
  maxHeight:      VIEWPORT_H,
  everyNthFrame:  1,
});

cdp.on('Page.screencastFrame', async ({ data, sessionId }) => {
  frames.push(Buffer.from(data, 'base64'));
  await cdp.send('Page.screencastFrameAck', { sessionId });
});

console.log(`Recording for ${DURATION_MS}ms via CDP screencast...`);
await new Promise(r => setTimeout(r, DURATION_MS));

await cdp.send('Page.stopScreencast');
await browser.close();

// Save frames
frames.forEach((buf, i) => {
  writeFileSync(join(FRAMES_DIR, `frame-${String(i).padStart(4, '0')}.jpg`), buf);
});

const fps = Math.round(frames.length / (DURATION_MS / 1000));
console.log(`Captured ${frames.length} frames (~${fps}fps) → ${FRAMES_DIR}`);
console.log(`FPS to use with ffmpeg: ${fps}`);
