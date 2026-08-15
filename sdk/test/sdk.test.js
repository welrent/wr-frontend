import test from 'node:test';
import assert from 'node:assert/strict';
import { WelrentClient } from '../src/index.js';

test('WelrentClient builds API paths against baseUrl', async () => {
  const calls = [];
  const fetchImpl = async (url, init = {}) => {
    calls.push({ url, init });
    return {
      ok: true,
      status: 200,
      async text() {
        return JSON.stringify([{ id: 1, name: 'an RS6', slug: 'an-RS6', price: 120 }]);
      },
    };
  };

  const client = new WelrentClient({ baseUrl: 'http://localhost:8080/', fetchImpl });
  const cars = await client.getCars();

  assert.equal(calls[0].url, 'http://localhost:8080/api/cars');
  assert.equal(cars[0].slug, 'an-RS6');
});

test('login posts JSON credentials', async () => {
  let body = null;
  const fetchImpl = async (_url, init = {}) => {
    body = init.body;
    return {
      ok: true,
      status: 200,
      async text() {
        return JSON.stringify({ token: 'abc', user: { id: 1, email: 'a@b.com' } });
      },
    };
  };

  const client = new WelrentClient({ baseUrl: 'http://example.test', fetchImpl });
  const result = await client.login({ email: 'a@b.com', password: 'secret' });

  assert.deepEqual(JSON.parse(body), { email: 'a@b.com', password: 'secret' });
  assert.equal(result.token, 'abc');
});
