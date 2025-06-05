/**
 * vehicle 에서 사용하는 타입을 정의하는 파일입니다.
 */

// 차량 목록 조회 reuqest
export interface VehicleListRequest {
  page?: number;
  size?: number;
  status?: string;
  keyword?: string;
}

// 차량 목록 조회 response
export interface VehicleListResponse {
  list: VehicleSummary[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// 차량 목록 요소
export interface VehicleSummary {
  id: number;
  registrationNumber: string;
  modelYear: string;
  manufacturer: string;
  modelName: string;
  batteryVoltage: string;
  fuelType: string;
  transmissionType: string;
  status: string;
  statusName: string;
  memo: string;
}
