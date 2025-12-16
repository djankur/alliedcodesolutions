import { apiClient, ApiResponse } from '@/lib/api';

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  user_type: 'job_seeker' | 'employer';
  company_name?: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  user_type: 'job_seeker' | 'employer';
  company_name?: string;
  is_active: boolean;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// Auth Service
export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials, false);
    
    // Store token in localStorage
    if (response.access_token) {
      localStorage.setItem('auth_token', response.access_token);
      localStorage.setItem('current_user', JSON.stringify(response.user));
    }
    
    return response;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData, false);
    
    // Store token in localStorage
    if (response.access_token) {
      localStorage.setItem('auth_token', response.access_token);
      localStorage.setItem('current_user', JSON.stringify(response.user));
    }
    
    return response;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API call result
      localStorage.removeItem('auth_token');
      localStorage.removeItem('current_user');
    }
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },

  async refreshToken(): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/refresh');
    
    if (response.access_token) {
      localStorage.setItem('auth_token', response.access_token);
    }
    
    return response;
  },

  async forgotPassword(email: string): Promise<ApiResponse<null>> {
    return apiClient.post<ApiResponse<null>>('/auth/forgot-password', { email }, false);
  },

  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<null>> {
    return apiClient.post<ApiResponse<null>>('/auth/reset-password', { 
      token, 
      new_password: newPassword 
    }, false);
  },

  // Helper functions
  getCurrentUserFromStorage(): User | null {
    const userStr = localStorage.getItem('current_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
};