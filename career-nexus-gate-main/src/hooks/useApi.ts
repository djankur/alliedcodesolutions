import { useState, useCallback } from 'react';
import { ApiError } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// Generic API Hook
export function useApi<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const execute = useCallback(async (
    apiCall: () => Promise<T>,
    options?: {
      successMessage?: string;
      errorMessage?: string;
      showSuccessToast?: boolean;
      showErrorToast?: boolean;
    }
  ) => {
    const {
      successMessage = 'Operation completed successfully',
      errorMessage = 'An error occurred',
      showSuccessToast = false,
      showErrorToast = true
    } = options || {};

    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      setData(result);
      
      if (showSuccessToast) {
        toast({
          title: 'Success',
          description: successMessage,
        });
      }
      
      return result;
    } catch (err) {
      const errorMsg = err instanceof ApiError ? err.message : errorMessage;
      setError(errorMsg);
      
      if (showErrorToast) {
        toast({
          title: 'Error',
          description: errorMsg,
          variant: 'destructive',
        });
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset
  };
}

// Specific hooks for common operations
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('auth_token');
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const userStr = localStorage.getItem('current_user');
    return userStr ? JSON.parse(userStr) : null;
  });

  const updateAuthState = useCallback((token?: string, user?: any) => {
    if (token && user) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('current_user', JSON.stringify(user));
      setIsAuthenticated(true);
      setCurrentUser(user);
    } else {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('current_user');
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  }, []);

  return {
    isAuthenticated,
    currentUser,
    updateAuthState
  };
}

// Form submission hook
export function useFormSubmission<T = any>() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { toast } = useToast();

  const submit = useCallback(async (
    formData: any,
    apiCall: (data: any) => Promise<T>,
    options?: {
      successMessage?: string;
      onSuccess?: (data: T) => void;
      onError?: (error: string) => void;
      resetForm?: () => void;
    }
  ) => {
    const {
      successMessage = 'Form submitted successfully',
      onSuccess,
      onError,
      resetForm
    } = options || {};

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await apiCall(formData);
      
      toast({
        title: 'Success',
        description: successMessage,
      });

      if (resetForm) resetForm();
      if (onSuccess) onSuccess(result);
      
      return result;
    } catch (err) {
      const errorMsg = err instanceof ApiError ? err.message : 'An error occurred while submitting the form';
      setSubmitError(errorMsg);
      
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });

      if (onError) onError(errorMsg);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [toast]);

  return {
    isSubmitting,
    submitError,
    submit
  };
}

// Pagination hook
export function usePagination(initialPage: number = 1, initialSize: number = 10) {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / size);

  const goToPage = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }, [page, totalPages]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const updateTotal = useCallback((newTotal: number) => {
    setTotal(newTotal);
  }, []);

  const reset = useCallback(() => {
    setPage(1);
    setTotal(0);
  }, []);

  return {
    page,
    size,
    total,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    setSize,
    updateTotal,
    reset,
    hasNext: page < totalPages,
    hasPrev: page > 1
  };
}

// File upload hook
export function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const upload = useCallback(async (
    file: File,
    apiCall: (file: File) => Promise<any>,
    options?: {
      onProgress?: (progress: number) => void;
      onSuccess?: (result: any) => void;
      onError?: (error: string) => void;
    }
  ) => {
    const { onProgress, onSuccess, onError } = options || {};

    setUploading(true);
    setUploadError(null);
    setUploadProgress(0);

    try {
      // Simulate progress for better UX (actual progress would require XMLHttpRequest)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const next = prev + Math.random() * 30;
          if (onProgress) onProgress(Math.min(next, 90));
          return Math.min(next, 90);
        });
      }, 200);

      const result = await apiCall(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (onSuccess) onSuccess(result);
      return result;
    } catch (err) {
      const errorMsg = err instanceof ApiError ? err.message : 'Upload failed';
      setUploadError(errorMsg);
      
      if (onError) onError(errorMsg);
      throw err;
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  }, []);

  return {
    uploading,
    uploadProgress,
    uploadError,
    upload
  };
}