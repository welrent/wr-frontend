/**
 * Welrent API SDK
 * Simplifies and robustifies API interactions structurally.
 */
class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL || '';
    }

    async search(query) {
        try {
            const response = await fetch(`${this.baseURL}/api/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error('Network response failed');
            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error('API Search Error:', error);
            return [];
        }
    }
}

// Instantiate globally for UI scripts
window.WelrentAPI = new ApiClient();
