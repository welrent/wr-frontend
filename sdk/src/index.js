/**
 * @welrent/sdk — lightweight client for the Welrent PHP JSON API
 */

export class WelrentClient {
  /**
   * @param {object} [options]
   * @param {string} [options.baseUrl] API origin, e.g. http://localhost:8080
   * @param {typeof fetch} [options.fetchImpl]
   */
  constructor(options = {}) {
    this.baseUrl = String(options.baseUrl || 'http://localhost:8080').replace(/\/$/, '');
    this.fetchImpl = options.fetchImpl || globalThis.fetch.bind(globalThis);
  }

  /** @param {string} path @param {RequestInit} [init] */
  async request(path, init = {}) {
    const url = `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
    const res = await this.fetchImpl(url, {
      ...init,
      headers: {
        Accept: 'application/json',
        ...(init.body ? { 'Content-Type': 'application/json' } : {}),
        ...(init.headers || {}),
      },
    });

    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      const err = new Error(data?.error || data?.message || `HTTP ${res.status}`);
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  health() {
    return this.request('/');
  }

  getCars() {
    return this.request('/api/cars');
  }

  getVehicle(slug) {
    return this.request(`/api/vehicle/${encodeURIComponent(slug)}`);
  }

  getContent() {
    return this.request('/api/content');
  }

  getNavFooter() {
    return this.request('/api/nav_footer');
  }

  /**
   * @param {{ email: string, password: string }} credentials
   */
  login(credentials) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  /**
   * @param {string} uid
   */
  getRentals(uid) {
    return this.request(`/api/rentals?uid=${encodeURIComponent(uid)}`);
  }

  /**
   * @param {object} payload
   */
  createRental(payload) {
    return this.request('/api/rentals', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}

export default WelrentClient;
