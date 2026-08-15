import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sdkPath = path.join(root, 'welrent-auth.js');

test('WelrentAuth SDK is vendored from Act and exposes public API surface', () => {
  const source = fs.readFileSync(sdkPath, 'utf8');
  assert.match(source, /WelrentAuth/);
  assert.match(source, /onAuthStateChanged/);
  assert.match(source, /accounts\.welrent\.com/);
  assert.match(source, /WELRENT_SSO_TOKEN/);
  assert.match(source, /window\.WelrentAuth\s*=\s*WelrentAuth/);
});
