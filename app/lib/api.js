// Centralized API service layer
import { APP_CONFIG } from '@/constants';

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
    return localStorage.getItem(APP_CONFIG.AUTH.TOKEN_KEY);
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
        const errorMessage = errorData.error || errorData.message || `HTTP error! status: ${response.status}`;
        
        // If it's an auth error (401), clear the token
        if (response.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
          }
        }
        
        throw new Error(errorMessage);
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

