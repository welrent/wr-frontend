#!/usr/bin/env node
import { WelrentClient } from '../src/index.js';

const baseUrl = process.env.WELRENT_API_BASE || 'http://127.0.0.1:8080';
const client = new WelrentClient({ baseUrl });

const results = [];

async function step(name, fn) {
  try {
    const data = await fn();
    results.push({ name, ok: true, data });
    console.log(`✔ ${name}`);
  } catch (err) {
    results.push({ name, ok: false, error: err.message });
    console.error(`✘ ${name}: ${err.message}`);
  }
}

await step('health', () => client.health());
await step('cars', () => client.getCars());
await step('vehicle', () => client.getVehicle('an-RS6'));
await step('content', () => client.getContent());
await step('nav_footer', () => client.getNavFooter());
await step('login', () => client.login({ email: 'demo@welrent.com', password: 'demo-pass' }));

const failed = results.filter((r) => !r.ok);
if (failed.length) {
  console.error(`\nSDK smoke failed (${failed.length}/${results.length})`);
  process.exit(1);
}

console.log(`\nSDK smoke passed against ${baseUrl}`);
console.log(JSON.stringify(results.map((r) => ({ name: r.name, ok: r.ok })), null, 2));
