import { apiClient, ApiResponse } from '@/lib/api';

// Payment Types
export interface PaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_account';
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
  is_default: boolean;
}

export interface Subscription {
  id: string;
  plan_id: string;
  plan_name: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  current_period_start: string;
  current_period_end: string;
  amount: number;
  currency: string;
  interval: 'month' | 'year';
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  is_popular: boolean;
  user_type: 'job_seeker' | 'employer' | 'both';
}

export interface PaymentHistory {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  description: string;
  created_at: string;
  invoice_url?: string;
}

// Payment Service
export const paymentService = {
  // One-time payments
  async createPaymentIntent(amount: number, currency: string = 'usd', metadata?: Record<string, any>): Promise<PaymentIntent> {
    return apiClient.post<PaymentIntent>('/payments/create-intent', {
      amount,
      currency,
      metadata
    });
  },

  async confirmPayment(paymentIntentId: string, paymentMethodId: string): Promise<ApiResponse<any>> {
    return apiClient.post<ApiResponse<any>>('/payments/confirm', {
      payment_intent_id: paymentIntentId,
      payment_method_id: paymentMethodId
    });
  },

  // Subscriptions
  async getPricingPlans(userType?: 'job_seeker' | 'employer'): Promise<PricingPlan[]> {
    return apiClient.get<PricingPlan[]>('/payments/plans', userType ? { user_type: userType } : undefined);
  },

  async createSubscription(planId: string, paymentMethodId: string): Promise<Subscription> {
    return apiClient.post<Subscription>('/payments/subscriptions/create', {
      plan_id: planId,
      payment_method_id: paymentMethodId
    });
  },

  async getMySubscription(): Promise<Subscription | null> {
    try {
      return await apiClient.get<Subscription>('/payments/subscriptions/current');
    } catch (error: any) {
      if (error.status === 404) return null;
      throw error;
    }
  },

  async cancelSubscription(subscriptionId: string): Promise<Subscription> {
    return apiClient.post<Subscription>(`/payments/subscriptions/${subscriptionId}/cancel`);
  },

  async updateSubscription(subscriptionId: string, newPlanId: string): Promise<Subscription> {
    return apiClient.post<Subscription>(`/payments/subscriptions/${subscriptionId}/update`, {
      plan_id: newPlanId
    });
  },

  // Payment Methods
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    return apiClient.get<PaymentMethod[]>('/payments/payment-methods');
  },

  async addPaymentMethod(paymentMethodId: string, setAsDefault: boolean = false): Promise<PaymentMethod> {
    return apiClient.post<PaymentMethod>('/payments/payment-methods/add', {
      payment_method_id: paymentMethodId,
      set_as_default: setAsDefault
    });
  },

  async deletePaymentMethod(paymentMethodId: string): Promise<ApiResponse<null>> {
    return apiClient.delete<ApiResponse<null>>(`/payments/payment-methods/${paymentMethodId}`);
  },

  async setDefaultPaymentMethod(paymentMethodId: string): Promise<PaymentMethod> {
    return apiClient.post<PaymentMethod>('/payments/payment-methods/set-default', {
      payment_method_id: paymentMethodId
    });
  },

  // Payment History
  async getPaymentHistory(page: number = 1, size: number = 10): Promise<{ items: PaymentHistory[]; total: number }> {
    return apiClient.get<{ items: PaymentHistory[]; total: number }>('/payments/history', { page, size });
  },

  async getInvoice(paymentId: string): Promise<Blob> {
    const response = await fetch(`${apiClient['baseURL']}/payments/invoice/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to download invoice');
    }
    
    return response.blob();
  },

  // Job posting payments (for employers)
  async purchaseJobPostingCredits(planId: string, paymentMethodId: string): Promise<ApiResponse<any>> {
    return apiClient.post<ApiResponse<any>>('/payments/job-credits/purchase', {
      plan_id: planId,
      payment_method_id: paymentMethodId
    });
  },

  async getJobPostingCredits(): Promise<{ credits: number; expires_at?: string }> {
    return apiClient.get<{ credits: number; expires_at?: string }>('/payments/job-credits/balance');
  }
};