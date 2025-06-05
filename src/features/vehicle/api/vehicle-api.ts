import api from '@/libs/axios';
import type { VehicleListRequest, VehicleListResponse } from './types';
import { CODE_SUCCESS, type CommonResponse } from '@/utils/response';

//TODO: 엑세스 토큰 임시로 임의로 추가
const temporaryAccessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzQ5MTMxNzExLCJleHAiOjE3NDkxMzUzMTF9.gt_5f6gI4lz51yv8rjjgB1OdCKk6o7dBhG5XG4EbQuU';

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
