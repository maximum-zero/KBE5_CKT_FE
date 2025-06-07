import api from '@/libs/axios';
import type { RegisterVehicleRequest, RegisterVehicleResponse, VehicleListRequest, VehicleListResponse } from './types';
import { CODE_SUCCESS, type CommonResponse } from '@/utils/response';

//TODO: 엑세스 토큰 임시로 임의로 추가
const temporaryAccessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzQ5MjkwODE2LCJleHAiOjE3NDkyOTQ0MTZ9.5WL27G0lHVBBsqhkVqL239LSwlHaSRViI5liemTZb_Y';

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
