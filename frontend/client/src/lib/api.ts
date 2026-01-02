const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface ApiError {
  message: string;
  status: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeader(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error: ApiError = {
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
        };
        throw error;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw {
          message: error.message,
          status: 0,
        } as ApiError;
      }
      throw error;
    }
  }

  // Auth endpoints
  async signup(data: {
    email: string;
    password: string;
    company_name: string;
    business_type: string;
  }) {
    return this.request<{
      user_id: string;
      email: string;
      message: string;
    }>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(email: string, password: string) {
    const response = await this.request<{
      token: string;
      user: {
        id: string;
        email: string;
        company_name: string;
      };
    }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Store token
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    return response;
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // Dashboard endpoints
  async getDashboardOverview() {
    return this.request<{
      monthly_volume: number;
      transaction_count: number;
      pending_settlement: number;
      bus_locked: number;
      bus_required: number;
    }>('/api/dashboard/overview');
  }

  // Transactions endpoints
  async getTransactions(params?: {
    search?: string;
    filter?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.filter) queryParams.append('filter', params.filter);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const query = queryParams.toString();
    const endpoint = query ? `/api/transactions?${query}` : '/api/transactions';

    return this.request<{
      transactions: Array<{
        id: string;
        tx_type: string;
        method: string;
        amount: string;
        status: string;
        date: string;
        fee: string;
      }>;
      total: number;
      page: number;
    }>(endpoint);
  }

  async getTransaction(id: string) {
    return this.request<{
      id: string;
      tx_type: string;
      method: string;
      amount: string;
      status: string;
      date: string;
      fee: string;
      details: string;
    }>(`/api/transactions/${id}`);
  }

  // Treasury endpoints
  async getTreasuryPositions() {
    return this.request<Array<{
      name: string;
      protocol: string;
      balance: string;
      value: number;
      apy: string;
    }>>('/api/treasury/positions');
  }

  async getTreasuryPortfolio() {
    return this.request<{
      total_value: number;
      assets: Array<{
        name: string;
        protocol: string;
        balance: string;
        value: number;
        apy: string;
      }>;
    }>('/api/treasury/portfolio');
  }

  // API Keys endpoints
  async getApiKeys() {
    return this.request<Array<{
      id: string;
      name: string;
      prefix: string;
      created_at: string;
      last_used: string;
      permissions: string[];
      status: string;
    }>>('/api/keys');
  }

  async createApiKey(name: string) {
    return this.request<{
      id: string;
      secret_key: string;
      name: string;
      created_at: string;
    }>('/api/keys', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  }

  async deleteApiKey(id: string) {
    return this.request<{
      message: string;
    }>(`/api/keys/${id}`, {
      method: 'DELETE',
    });
  }

  // Settings endpoints
  async getSettings() {
    return this.request<{
      company_name: string;
      email: string;
      website: string;
      registration_number: string;
      kyc_status: string;
    }>('/api/user/settings');
  }

  async updateSettings(data: {
    company_name: string;
    email: string;
    website: string;
  }) {
    return this.request<{
      message: string;
      updated_fields: string[];
    }>('/api/user/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient(API_BASE_URL);
