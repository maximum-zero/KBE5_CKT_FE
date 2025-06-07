import api from '@/libs/axios';
import type {
  RegisterVehicleRequest,
  RegisterVehicleResponse,
  Vehicle,
  VehicleListRequest,
  VehicleListResponse,
} from '../types';
import { CODE_SUCCESS, type CommonResponse } from '@/utils/response';

// TODO: 엑세스 토큰 임시로 임의로 추가
const temporaryAccessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzQ5MzEwMDY4LCJleHAiOjE3NDkzMTM2Njh9.okLA_PCR5fEeTY6WdIf210o5FRjdp6XMWav0XtiiESU';

// --- API 함수 정의 ---

/**
 * 차량 목록을 조회하는 API 함수입니다.
 * @param params 조회 필터 (페이지, 사이즈, 상태, 키워드 등)
 * @returns 차량 목록 응답 데이터
 * @throws API 호출 실패 시 에러
 */
export const fetchVehicles = async (params: VehicleListRequest): Promise<VehicleListResponse> => {
  const response = await api.get<CommonResponse<VehicleListResponse>>('/api/v1/vehicles', {
    params,
    headers: {
      Authorization: `Bearer ${temporaryAccessToken}`,
      'Content-Type': 'application/json',
    },
  });
  if (response.data.code !== CODE_SUCCESS) {
    throw new Error(response.data.message);
  }
  return response.data.data;
};

/**
 * 특정 차량의 상세 정보를 조회하는 API 함수입니다.
 * @param id 조회할 차량의 고유 ID
 * @returns 차량 상세 정보
 * @throws API 호출 실패 시 에러
 */
export const getVehicleDetail = async (id: number): Promise<Vehicle> => {
  const response = await api.get<CommonResponse<Vehicle>>(`/api/v1/vehicles/${id}`, {
    headers: {
      Authorization: `Bearer ${temporaryAccessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.data.code !== CODE_SUCCESS) {
    throw new Error(response.data.message);
  }
  return response.data.data;
};

/**
 * 새로운 차량 정보를 등록하는 API 함수입니다.
 * @param data 등록할 차량 데이터
 * @returns 등록된 차량의 응답 데이터 (ID 포함)
 * @throws API 호출 실패 시 에러
 */
export const registerVehicle = async (data: RegisterVehicleRequest): Promise<RegisterVehicleResponse> => {
  const response = await api.post<CommonResponse<RegisterVehicleResponse>>('/api/v1/vehicles', data, {
    headers: {
      Authorization: `Bearer ${temporaryAccessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.data.code !== CODE_SUCCESS) {
    throw new Error(response.data.message || '차량 등록에 실패했습니다.');
  }

  return response.data.data;
};

/**
 * 특정 차량 정보를 수정하는 API 함수입니다.
 * @param id 수정할 차량의 고유 ID
 * @param request 수정할 차량 데이터
 * @returns 수정된 차량 상세 정보
 * @throws API 호출 실패 시 에러
 */
export const updateVehicle = async (id: number, request: RegisterVehicleRequest): Promise<Vehicle> => {
  const response = await api.put<CommonResponse<Vehicle>>(`/api/v1/vehicles/${id}`, request, {
    headers: {
      Authorization: `Bearer ${temporaryAccessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.data.code !== CODE_SUCCESS) {
    throw new Error(response.data.message || '차량 수정에 실패했습니다.');
  }

  return response.data.data;
};

/**
 * 특정 차량 정보를 삭제하는 API 함수입니다.
 * @param id 삭제할 차량의 고유 ID
 * @throws API 호출 실패 시 에러
 */
export const deleteVehicle = async (id: number): Promise<void> => {
  const response = await api.delete<CommonResponse<void>>(`/api/v1/vehicles/${id}`, {
    headers: {
      Authorization: `Bearer ${temporaryAccessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.data.code !== CODE_SUCCESS) {
    throw new Error(response.data.message || '차량 삭제에 실패했습니다.');
  }
};
