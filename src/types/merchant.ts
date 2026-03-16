export interface Merchant {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
  establishmentCount: number;
  status: 'Activo' | 'Inactivo';
  municipalityName?: string;
  departmentName?: string;
  updatedAt?: string;
  updatedBy?: string | null;
  totalRevenue?: number;
  totalEmployees?: number;
  municipalityId?: number;
}

export interface MerchantsResponse {
  data: Merchant[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface MerchantsFilters {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
  status?: string;
}