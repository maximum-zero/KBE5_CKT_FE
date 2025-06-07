import api from '@/libs/axios';
import type {
  RegisterVehicleRequest,
  RegisterVehicleResponse,
  Vehicle,
  VehicleListRequest,
  VehicleListResponse,
} from './types';
import { CODE_SUCCESS, type CommonResponse } from '@/utils/response';

//TODO: 엑세스 토큰 임시로 임의로 추가
const temporaryAccessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzQ5MzA0NTg0LCJleHAiOjE3NDkzMDgxODR9.motcxFU1zydwjNxJHa7korCk9azCO_XCD-Ba72PoNAM';

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
