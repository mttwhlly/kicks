/**
 * API client configuration and utilities
 */

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  headers?: Record<string, string>;
}

export class ApiClient {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        ...(config.headers || {})
      }
    };
  }

  /**
   * Generic method to make API requests
   */
  async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: unknown
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method,
        headers: this.config.headers,
        body: data ? JSON.stringify(data) : undefined,
        signal: AbortSignal.timeout(this.config.timeout)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  /**
   * Convenience methods for common HTTP methods
   */
  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, 'GET');
  }

  post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, 'POST', data);
  }

  put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, 'PUT', data);
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, 'DELETE');
  }
}