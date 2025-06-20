import api from '@/libs/axios';
import type {
  RegisterRentalRequest,
  RegisterRentalResponse,
  Rental,
  RentalListRequest,
  RentalListResponse,
  SearchCustomerResponse,
  SearchVehicleResponse,
  UpdateRentalMemoRequest,
  UpdateRentalRequest,
  UpdateRentalResponse,
  UpdateRentalStatusRequest,
  UpdateRentalStatusResponse,
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

/**
 * 새로운 예약 정보를 등록하는 API 함수입니다.
 * @param data 등록할 예약 데이터
 * @returns 등록된 예약의 응답 데이터 (ID 포함)
 * @throws API 호출 실패 시 에러
 */
export const registerRental = async (data: RegisterRentalRequest): Promise<RegisterRentalResponse> => {
  const response = await api.post<CommonResponse<RegisterRentalResponse>>('/api/v1/rentals', data);

  if (response.data.code !== CODE_SUCCESS) {
    throw new APIError(response.data as CommonErrorResponse);
  }

  return response.data.data;
};

/**
 * 고객 정보를 검색하는 API 함수입니다.
 * @param keyword 검색할 키워드 (예: 이름, 전화번호, 이메일)
 * @param signal AbortController의 Signal 객체. 요청 취소에 사용됩니다. (선택 사항)
 * @returns 검색된 고객 정보 목록을 포함하는 응답 데이터
 * @throws API 호출 실패 시 에러
 */
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

/**
 * 특정 기간 내의 차량 정보를 검색하는 API 함수입니다.
 * @param pickupAt 대여 시작 일시 (ISO 8601 형식 문자열)
 * @param returnAt 반납 예정 일시 (ISO 8601 형식 문자열)
 * @param keyword 검색할 차량 관련 키워드 (예: 차량 번호, 모델명)
 * @param signal AbortController의 Signal 객체. 요청 취소에 사용됩니다. (선택 사항)
 * @returns 검색된 차량 정보 목록을 포함하는 응답 데이터
 * @throws API 호출 실패 시 에러
 */
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

/**
 * 특정 예약의 상세 정보를 조회하는 API 함수입니다.
 * @param id 조회할 예약의 고유 ID
 * @returns 예약 상세 정보
 * @throws API 호출 실패 시 에러
 */
export const getRentalDetail = async (id: number): Promise<Rental> => {
  const response = await api.get<CommonResponse<Rental>>(`/api/v1/rentals/${id}`);

  if (response.data.code !== CODE_SUCCESS) {
    throw new APIError(response.data as CommonErrorResponse);
  }
  return response.data.data;
};

/**
 * 특정 예약 정보를 수정하는 API 함수입니다.
 * @param id 수정할 예약의 고유 ID
 * @param data 수정할 예약 데이터
 * @returns 수정된 예약의 응답 데이터 (ID 포함)
 * @throws API 호출 실패 시 에러
 */
export const updateRental = async (id: number, data: UpdateRentalRequest): Promise<UpdateRentalResponse> => {
  const response = await api.put<CommonResponse<Rental>>(`/api/v1/rentals/${id}`, data);

  if (response.data.code !== CODE_SUCCESS) {
    throw new APIError(response.data as CommonErrorResponse);
  }

  return response.data.data;
};

/**
 * 특정 예약 정보의 메모를 수정하는 API 함수입니다.
 * @param id 수정할 예약의 고유 ID
 * @param data 수정할 예약 데이터 (메모)
 * @returns 수정된 예약의 응답 데이터 (ID 포함)
 * @throws API 호출 실패 시 에러
 */
export const updateRentalMemo = async (id: number, data: UpdateRentalMemoRequest): Promise<UpdateRentalResponse> => {
  const response = await api.put<CommonResponse<Rental>>(`/api/v1/rentals/${id}/memo`, data);

  if (response.data.code !== CODE_SUCCESS) {
    throw new APIError(response.data as CommonErrorResponse);
  }

  return response.data.data;
};

/**
 * 특정 예약 상태를 변경하는 API 함수입니다.
 * @param id 상태를 변경할 예약의 고유 ID
 * @param data 예약의 상태를 포함한 데이터
 * @returns 수정된 예약의 응답 데이터 (ID 포함)
 * @throws API 호출 실패 시 에러
 */
export const updateRentalStatus = async (
  id: number,
  data: UpdateRentalStatusRequest
): Promise<UpdateRentalStatusResponse> => {
  const response = await api.patch<CommonResponse<UpdateRentalStatusResponse>>(`/api/v1/rentals/${id}/status`, data);

  if (response.data.code !== CODE_SUCCESS) {
    throw new APIError(response.data as CommonErrorResponse);
  }

  return response.data.data;
};
