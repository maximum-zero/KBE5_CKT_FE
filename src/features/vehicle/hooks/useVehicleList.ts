import { useState, useCallback, useEffect } from 'react';
import type { VehicleSummary } from '../api/types';
import { fetchVehicles } from '../api/vehicle-api';

// Filter Interface
interface VehicleListFilters {
  status: string;
  keyword: string;
}

// Hook Request Interface
type UseVehicleListOptions = Partial<VehicleListFilters> & {
  page?: number;
  itemsPerPage?: number;
};

// Hook Return Interface
interface UseVehicleListResult {
  isLoading: boolean;
  error: string | null;

  vehicles: VehicleSummary[];
  totalCount: number;
  totalPages: number;

  itemsPerPage: number;
  currentPage: number;
  filters: VehicleListFilters;
  setFilters: (newFilters: Partial<VehicleListFilters>) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  refetch: (options?: { page?: number; filters?: Partial<VehicleListFilters> }) => void;
}

const DEFAULT_ITEMS_PER_PAGE = 10;

export const useVehicleList = (options?: UseVehicleListOptions): UseVehicleListResult => {
  const [currentPage, setCurrentPage] = useState(options?.page || 1);
  const [itemsPerPage, setItemsPerPage] = useState(options?.itemsPerPage || DEFAULT_ITEMS_PER_PAGE);
  const [filters, setFiltersState] = useState<VehicleListFilters>({
    status: options?.status || '',
    keyword: options?.keyword || '',
  });

  const [vehicles, setVehicles] = useState<VehicleSummary[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const setFilters = useCallback((newFilters: Partial<VehicleListFilters>) => {
    setFiltersState(prevFilters => ({ ...prevFilters, ...newFilters }));
    setCurrentPage(1);
  }, []);

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const refetch = useCallback(
    async (options?: { page?: number; filters?: Partial<VehicleListFilters> }) => {
      setIsLoading(true);
      setError(null);

      try {
        const pageToFetch = (options?.page !== undefined ? options.page : currentPage) - 1;
        const filtersToApply = { ...filters, ...(options?.filters || {}) };

        const response = await fetchVehicles({
          ...filtersToApply,
          page: pageToFetch,
          size: itemsPerPage,
        });

        setVehicles(response.list);
        setTotalCount(response.totalElements);
        setTotalPages(response.totalPages);
      } catch (err) {
        setError('차량 정보를 불러오는 데 실패했습니다.');
        console.error('Error fetching vehicles:', err);

        setVehicles([]);
        setTotalCount(0);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    },
    [filters, currentPage, itemsPerPage]
  );

  useEffect(() => {
    refetch();
  }, []);

  return {
    isLoading,
    error,
    vehicles,
    totalCount,
    totalPages,
    itemsPerPage,
    currentPage,
    filters,
    setFilters,
    setCurrentPage: setPage,
    setItemsPerPage,
    refetch,
  };
};
