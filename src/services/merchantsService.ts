import api from './api';
import type { MerchantsResponse, MerchantsFilters, Merchant } from '../types/merchant';
import type { ApiResponse } from '../types/auth';

export const merchantsService = {
  // Obtener lista de comerciantes
  getAll: async (filters: MerchantsFilters): Promise<MerchantsResponse> => {
    try {
      const params = new URLSearchParams();
      params.append('pageNumber', filters.pageNumber.toString());
      params.append('pageSize', filters.pageSize.toString());
      if (filters.searchTerm) params.append('searchTerm', filters.searchTerm);
      if (filters.status) params.append('status', filters.status);

      const response = await api.get<ApiResponse<MerchantsResponse>>(
        `/api/Merchants?${params.toString()}`
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener un comerciante por ID
  getById: async (id: number): Promise<Merchant> => {
    try {
      const response = await api.get<ApiResponse<Merchant>>(
        `/api/Merchants/${id}`
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Crear comerciante
  create: async (data: Partial<Merchant>): Promise<Merchant> => {
    try {
      const response = await api.post<ApiResponse<Merchant>>(
        '/api/Merchants',
        data
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar comerciante
  update: async (id: number, data: Partial<Merchant>): Promise<Merchant> => {
    try {
      const response = await api.put<ApiResponse<Merchant>>(
        `/api/Merchants/${id}`,
        data
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar comerciante
  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/api/Merchants/${id}`);
    } catch (error) {
      throw error;
    }
  },

  // Cambiar estado
  toggleStatus: async (id: number): Promise<Merchant> => {
    try {
      const response = await api.patch<ApiResponse<Merchant>>(
        `/api/Merchants/${id}/toggle-status`
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Exportar CSV
  exportCSV: async (): Promise<Blob> => {
    try {
      const response = await api.get('/api/Merchants/reports/export', {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};