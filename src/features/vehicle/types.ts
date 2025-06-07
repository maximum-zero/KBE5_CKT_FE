/**
 * vehicle 에서 사용하는 타입을 정의하는 파일입니다.
 */
import type { TableHeader } from '@/components/ui/table/table/types';
import type { VehicleSummary } from './api/types';
import type { DropdownOption } from '@/components/ui/input/dropdown/types';

export interface VehicleFormData {
  registrationNumber: string;
  modelYear: string;
  manufacturer: string;
  modelName: string;
  batteryVoltage: string;
  fuelType: string;
  transmissionType: string;
  memo: string;
}

export interface VehicleFormErrors {
  registrationNumber?: string;
  modelYear?: string;
  manufacturer?: string;
  modelName?: string;
  batteryVoltage?: string;
  fuelType?: string;
  transmissionType?: string;
  memo?: string;
}

export interface UseVehicleRegisterReturn {
  formData: VehicleFormData;
  errors: VehicleFormErrors;
  handleInputChange: (id: keyof VehicleFormData, value: string) => void;
  handleSubmit: () => Promise<boolean>;
  resetForm: () => void;
}

export interface UseDetailPanelReturn<T> {
  isPanelOpen: boolean;
  selectedItem: T | null;
  openPanel: (item: T) => void;
  closePanel: () => void;
}

export const VEHICLE_TABLE_HEADERS: TableHeader<VehicleSummary>[] = [
  { label: '번호', key: 'id', width: '60px', align: 'center' },
  { label: '제조사', key: 'manufacturer', width: '8%', align: 'center' },
  { label: '모델', key: 'modelName', width: '9%', align: 'center' },
  { label: '차량 번호', key: 'registrationNumber', width: '9%', align: 'center' },
  { label: '연식', key: 'modelYear', width: '6%', align: 'center' },
  { label: '배터리 전력', key: 'batteryVoltage', width: '8%', align: 'center' },
  { label: '연료 타입', key: 'fuelType', width: '8%', align: 'center' },
  { label: '변속기', key: 'transmissionType', width: '8%', align: 'center' },
  {
    label: '상태',
    key: 'status',
    width: '9%',
    type: 'badge',
    displayKey: 'statusName',
    valueToBadgeColorMap: {
      AVAILABLE: 'green',
      RENTED: 'red',
      INACTIVE: 'gray',
    },
  },
  { label: '특이사항', key: 'memo', width: 'auto', align: 'left' },
];

export const STATUS_OPTIONS: DropdownOption[] = [
  { value: '', label: '전체' },
  { value: 'AVAILABLE', label: '대여 가능' },
  { value: 'RENTED', label: '대여중' },
  { value: 'INACTIVE', label: '비활성화' },
];

export const FUEL_TYPE_OPTIONS: DropdownOption[] = [
  { value: 'gasoline', label: '가솔린' },
  { value: 'diesel', label: '디젤' },
  { value: 'electric', label: '전기' },
  { value: 'hybrid', label: '하이브리드' },
];

export const TRANSMISSION_TYPE_OPTIONS: DropdownOption[] = [
  { value: 'automatic', label: '자동' },
  { value: 'manual', label: '수동' },
];
