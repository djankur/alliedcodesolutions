import { apiClient, ApiResponse } from '@/lib/api';

// Contact Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  user_type: 'job_seeker' | 'employer' | 'general';
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  user_type: 'job_seeker' | 'employer' | 'general';
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  submitted_at: string;
  updated_at: string;
}

export interface NewsletterSubscription {
  email: string;
  name?: string;
  preferences?: string[];
}

// Contact Service
export const contactService = {
  async submitContactForm(formData: ContactFormData): Promise<ApiResponse<ContactSubmission>> {
    return apiClient.post<ApiResponse<ContactSubmission>>('/contact/submit', formData, false);
  },

  async subscribeNewsletter(subscriptionData: NewsletterSubscription): Promise<ApiResponse<null>> {
    return apiClient.post<ApiResponse<null>>('/contact/newsletter/subscribe', subscriptionData, false);
  },

  async unsubscribeNewsletter(email: string): Promise<ApiResponse<null>> {
    return apiClient.post<ApiResponse<null>>('/contact/newsletter/unsubscribe', { email }, false);
  },

  async getContactSubmissions(page: number = 1, size: number = 10): Promise<{ items: ContactSubmission[]; total: number }> {
    return apiClient.get<{ items: ContactSubmission[]; total: number }>('/contact/submissions', { page, size });
  },

  async updateContactSubmissionStatus(submissionId: string, status: ContactSubmission['status']): Promise<ContactSubmission> {
    return apiClient.patch<ContactSubmission>(`/contact/submissions/${submissionId}`, { status });
  },

  async requestCallback(phoneNumber: string, preferredTime: string, name: string): Promise<ApiResponse<null>> {
    return apiClient.post<ApiResponse<null>>('/contact/callback-request', {
      phone: phoneNumber,
      preferred_time: preferredTime,
      name
    }, false);
  },

  async requestConsultation(consultationData: {
    name: string;
    email: string;
    company: string;
    phone: string;
    consultation_type: 'recruitment' | 'staffing' | 'executive_search';
    preferred_date: string;
    message?: string;
  }): Promise<ApiResponse<null>> {
    return apiClient.post<ApiResponse<null>>('/contact/consultation-request', consultationData, false);
  }
};