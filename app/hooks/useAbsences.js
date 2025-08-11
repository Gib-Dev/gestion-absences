import { useState, useEffect, useCallback, useMemo } from 'react';
import apiService from '@/lib/api';
import { APP_CONFIG } from '@/constants';

export const useAbsences = () => {
  const [absences, setAbsences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: APP_CONFIG.PAGINATION.DEFAULT_PAGE,
    limit: APP_CONFIG.PAGINATION.DEFAULT_LIMIT,
    total: 0,
    pages: 0,
  });

  // Fetch absences with pagination and search
  const fetchAbsences = useCallback(async (page = APP_CONFIG.PAGINATION.DEFAULT_PAGE, limit = APP_CONFIG.PAGINATION.DEFAULT_LIMIT, search = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
      });
      
      const response = await apiService.get(`/api/absences?${params}`);
      
      setAbsences(response.absences);
      setPagination(response.pagination);
    } catch (error) {
      setError(error.message);
      console.error('Failed to fetch absences:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoize pagination state to prevent unnecessary re-renders
  const memoizedPagination = useMemo(() => ({
    page: pagination.page,
    limit: pagination.limit,
    total: pagination.total,
    pages: pagination.pages,
  }), [pagination.page, pagination.limit, pagination.total, pagination.pages]);

  // Create new absence
  const createAbsence = useCallback(async (absenceData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.post('/api/absences', absenceData);
      
      // Refresh the list
      await fetchAbsences(pagination.page, pagination.limit);
      
      return { success: true, absence: response.absence };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [fetchAbsences, pagination.page, pagination.limit]);

  // Delete absence
  const deleteAbsence = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      await apiService.delete('/api/absences', { id });
      
      // Refresh the list
      await fetchAbsences(pagination.page, pagination.limit);
      
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [fetchAbsences, pagination.page, pagination.limit]);

  // Search absences
  const searchAbsences = useCallback((searchTerm) => {
    fetchAbsences(1, pagination.limit, searchTerm);
  }, [fetchAbsences, pagination.limit]);

  // Change page
  const changePage = useCallback((newPage) => {
    fetchAbsences(newPage, pagination.limit);
  }, [fetchAbsences, pagination.limit]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchAbsences();
  }, [fetchAbsences]);

  return {
    absences,
    loading,
    error,
    pagination: memoizedPagination,
    fetchAbsences,
    createAbsence,
    deleteAbsence,
    searchAbsences,
    changePage,
    clearError,
  };
};

