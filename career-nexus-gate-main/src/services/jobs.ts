import { apiClient, PaginatedResponse } from '@/lib/api';

// Job Types
export interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  job_type: 'full_time' | 'part_time' | 'contract' | 'remote';
  experience_level: 'entry' | 'mid' | 'senior' | 'executive';
  salary_min?: number;
  salary_max?: number;
  currency: string;
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  is_active: boolean;
  posted_date: string;
  application_deadline?: string;
  employer_id: string;
}

export interface JobFilters {
  search?: string;
  location?: string;
  job_type?: string;
  experience_level?: string;
  salary_min?: number;
  salary_max?: number;
  skills?: string[];
  page?: number;
  size?: number;
}

export interface CreateJobData {
  title: string;
  company_name: string;
  location: string;
  job_type: 'full_time' | 'part_time' | 'contract' | 'remote';
  experience_level: 'entry' | 'mid' | 'senior' | 'executive';
  salary_min?: number;
  salary_max?: number;
  currency: string;
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  application_deadline?: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  job_title: string;
  company_name: string;
  applicant_id: string;
  applicant_name: string;
  applicant_email: string;
  cover_letter?: string;
  resume_url?: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  applied_date: string;
  updated_date: string;
}

export interface ApplyJobData {
  cover_letter?: string;
  resume_file?: File;
}

// Jobs Service
export const jobsService = {
  async getJobs(filters?: JobFilters): Promise<PaginatedResponse<Job>> {
    return apiClient.get<PaginatedResponse<Job>>('/jobs', filters);
  },

  async getJob(jobId: string): Promise<Job> {
    return apiClient.get<Job>(`/jobs/${jobId}`);
  },

  async createJob(jobData: CreateJobData): Promise<Job> {
    return apiClient.post<Job>('/jobs', jobData);
  },

  async updateJob(jobId: string, jobData: Partial<CreateJobData>): Promise<Job> {
    return apiClient.put<Job>(`/jobs/${jobId}`, jobData);
  },

  async deleteJob(jobId: string): Promise<void> {
    return apiClient.delete<void>(`/jobs/${jobId}`);
  },

  async getMyJobs(page: number = 1, size: number = 10): Promise<PaginatedResponse<Job>> {
    return apiClient.get<PaginatedResponse<Job>>('/jobs/my-jobs', { page, size });
  },

  async applyForJob(jobId: string, applicationData: ApplyJobData): Promise<JobApplication> {
    if (applicationData.resume_file) {
      return apiClient.uploadFile<JobApplication>(
        `/jobs/${jobId}/apply`,
        applicationData.resume_file,
        { cover_letter: applicationData.cover_letter }
      );
    } else {
      return apiClient.post<JobApplication>(`/jobs/${jobId}/apply`, {
        cover_letter: applicationData.cover_letter
      });
    }
  },

  async getJobApplications(jobId: string): Promise<JobApplication[]> {
    return apiClient.get<JobApplication[]>(`/jobs/${jobId}/applications`);
  },

  async getMyApplications(page: number = 1, size: number = 10): Promise<PaginatedResponse<JobApplication>> {
    return apiClient.get<PaginatedResponse<JobApplication>>('/applications/my-applications', { page, size });
  },

  async updateApplicationStatus(applicationId: string, status: JobApplication['status']): Promise<JobApplication> {
    return apiClient.patch<JobApplication>(`/applications/${applicationId}`, { status });
  },

  async searchJobs(query: string, filters?: Omit<JobFilters, 'search'>): Promise<PaginatedResponse<Job>> {
    return apiClient.get<PaginatedResponse<Job>>('/jobs/search', { search: query, ...filters });
  },

  async getFeaturedJobs(): Promise<Job[]> {
    return apiClient.get<Job[]>('/jobs/featured');
  },

  async getJobsByCompany(companyName: string): Promise<Job[]> {
    return apiClient.get<Job[]>('/jobs/by-company', { company_name: companyName });
  }
};