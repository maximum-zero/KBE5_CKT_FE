import api from '@/libs/axios';
import type {
  RegisterRentalRequest,
  RegisterRentalResponse,
  RentalListRequest,
  RentalListResponse,
  SearchCustomerResponse,
  SearchVehicleResponse,
} from '../types';
import { APIError, CODE_SUCCESS, type CommonErrorResponse, type CommonResponse } from '@/utils/response';

// --- API 함수 정의 ---

/**
 * 예약 목록을 조회하는 API 함수입니다.
 * @param params 조회 필터 (페이지, 사이즈, 상태, 키워드 등)
 * @returns 예약 목록 응답 데이터
 * @throws API 호출 실패 시 에러
 */
export const fetchRentals = async (params: RentalListRequest): Promise<RentalListResponse> => {
  const response = await api.get<CommonResponse<RentalListResponse>>('/api/v1/rentals', {
    params,
  });
  if (response.data.code !== CODE_SUCCESS) {
    throw new Error(response.data.message);
  }
  return response.data.data;
};

export const registerRental = async (data: RegisterRentalRequest): Promise<RegisterRentalResponse> => {
  const response = await api.post<CommonResponse<RegisterRentalResponse>>('/api/v1/rentals', data);
  if (response.data.code !== CODE_SUCCESS) {
    throw new APIError(response.data as CommonErrorResponse);
  }

  return response.data.data;
};

export const fetchSearchCustomer = async (keyword: string, signal?: AbortSignal): Promise<SearchCustomerResponse> => {
  const response = await api.get<CommonResponse<SearchCustomerResponse>>(`/api/v1/customers/search`, {
    params: {
      keyword,
    },
    signal: signal,
  });
  if (response.data.code !== CODE_SUCCESS) {
    throw new Error(response.data.message);
  }
  return response.data.data;
};

export const fetchSearchVehicle = async (
  pickupAt: string,
  returnAt: string,
  keyword: string,
  signal?: AbortSignal
): Promise<SearchVehicleResponse> => {
  const response = await api.get<CommonResponse<SearchVehicleResponse>>(`/api/v1/vehicles/search`, {
    params: {
      pickupAt,
      returnAt,
      keyword,
    },
    signal: signal,
  });
  if (response.data.code !== CODE_SUCCESS) {
    throw new Error(response.data.message);
  }
  return response.data.data;
};
