// Centralized API service layer
class ApiService {
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Get auth token from localStorage
  getAuthToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  }

  // Set auth headers
  getAuthHeaders() {
    const token = this.getAuthToken();
    return token ? { ...this.defaultHeaders, Authorization: `Bearer ${token}` } : this.defaultHeaders;
  }

  // Generic request method with error handling
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint, data = null) {
    const options = { method: 'DELETE' };
    if (data) {
      options.body = JSON.stringify(data);
    }
    return this.request(endpoint, options);
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;

