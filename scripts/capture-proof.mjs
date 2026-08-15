import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const outDir = path.resolve('docs/proof');
const artifactDir = '/opt/cursor/artifacts/screenshots';
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(artifactDir, { recursive: true });
fs.mkdirSync('/opt/cursor/artifacts/videos', { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: { dir: '/tmp/welrent-video', size: { width: 1440, height: 900 } },
});
const page = await context.newPage();

async function shot(name, url) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(800);
  const dest = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: dest, fullPage: false });
  fs.copyFileSync(dest, path.join(artifactDir, `${name}.png`));
  console.log('saved', dest);
}

await shot('home', 'http://127.0.0.1:3000/');
await shot('act', 'http://127.0.0.1:3000/act');
await shot('offerlist', 'http://127.0.0.1:3000/offerlist');
await shot('vehicle', 'http://127.0.0.1:3000/vehicle/an-RS6');

// Navigate through flows for the video
await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.click('text=Welrent Act');
await page.waitForTimeout(1200);
await page.click('text=Browse vehicles');
await page.waitForTimeout(1200);
await page.click('text=View Deal');
await page.waitForTimeout(1500);

await context.close();
await browser.close();

// Move recorded video
const files = fs.readdirSync('/tmp/welrent-video').filter((f) => f.endsWith('.webm'));
if (!files.length) throw new Error('No video recorded');
const src = path.join('/tmp/welrent-video', files[0]);
const webmDest = path.join(outDir, 'welrent-walkthrough.webm');
fs.copyFileSync(src, webmDest);

// Convert to mp4 if ffmpeg available
const mp4Dest = path.join(outDir, 'welrent-walkthrough.mp4');
const ff = spawnSync('ffmpeg', ['-y', '-i', webmDest, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', mp4Dest], { encoding: 'utf8' });
if (ff.status === 0) {
  fs.copyFileSync(mp4Dest, '/opt/cursor/artifacts/videos/welrent-walkthrough.mp4');
  console.log('saved', mp4Dest);
} else {
  fs.copyFileSync(webmDest, '/opt/cursor/artifacts/videos/welrent-walkthrough.webm');
  console.log('ffmpeg failed, kept webm', ff.stderr?.slice(0, 400));
}

// SDK smoke screenshot via terminal output render is text; capture a JSON proof file + styled HTML shot
const smoke = spawnSync('node', ['scripts/smoke.mjs'], {
  cwd: path.resolve('sdk'),
  encoding: 'utf8',
  env: { ...process.env, WELRENT_API_BASE: 'http://127.0.0.1:8080' },
});
fs.writeFileSync(path.join(outDir, 'sdk-smoke.txt'), smoke.stdout + smoke.stderr);
const html = `<!doctype html><html><body style="margin:0;background:#0f172a;color:#e2e8f0;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;padding:40px"><h1 style="color:#5CAAF6">@welrent/sdk smoke</h1><pre style="white-space:pre-wrap;font-size:16px;line-height:1.5">${(smoke.stdout || '').replace(/[<>&]/g, (c) => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]))}</pre></body></html>`;
fs.writeFileSync('/tmp/sdk-smoke.html', html);
const b2 = await chromium.launch({ headless: true });
const p2 = await b2.newPage({ viewport: { width: 1100, height: 700 } });
await p2.goto('file:///tmp/sdk-smoke.html');
await p2.screenshot({ path: path.join(outDir, 'sdk-smoke.png') });
fs.copyFileSync(path.join(outDir, 'sdk-smoke.png'), path.join(artifactDir, 'sdk-smoke.png'));
await b2.close();
console.log('saved sdk-smoke.png');
