import { useState, useCallback } from 'react';
import { useLoading } from '@/context/LoadingContext';
import { toast } from 'react-toastify';

import type { VehicleFormData, VehicleFormErrors, UseVehicleRegisterReturn } from '../types';
import { registerVehicle } from '../api/vehicle-api';

export const useVehicleRegister = (): UseVehicleRegisterReturn => {
  const { showLoading, hideLoading } = useLoading();

  const [formData, setFormData] = useState<VehicleFormData>({
    registrationNumber: '',
    modelYear: '',
    manufacturer: '',
    modelName: '',
    batteryVoltage: '',
    fuelType: '',
    transmissionType: '',
    memo: '',
  });

  const [errors, setErrors] = useState<VehicleFormErrors>({});

  /**
   * 입력 필드 값 변경을 처리하고 해당 필드의 에러를 초기화합니다.
   * @param id 변경된 필드의 ID
   * @param value 변경된 값
   */
  const handleInputChange = useCallback((id: keyof VehicleFormData, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  }, []);

  /**
   * 폼 데이터의 유효성을 검사하고, 유효성 검사 결과를 반환합니다.
   * 유효하지 않은 경우 에러 상태를 업데이트합니다.
   * @returns 폼이 유효한지 여부
   */
  const validateForm = useCallback((): boolean => {
    let isValid = true;
    const newErrors: VehicleFormErrors = {};

    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = '차량 번호를 입력해주세요.';
      isValid = false;
    }
    if (!formData.modelYear.trim()) {
      newErrors.modelYear = '연식을 입력해주세요.';
      isValid = false;
    } else if (!/^\d{4}$/.test(formData.modelYear)) {
      newErrors.modelYear = '연식은 4자리 숫자로 입력해주세요.';
      isValid = false;
    }
    if (!formData.manufacturer.trim()) {
      newErrors.manufacturer = '제조사를 입력해주세요.';
      isValid = false;
    }
    if (!formData.modelName.trim()) {
      newErrors.modelName = '모델명을 입력해주세요.';
      isValid = false;
    }

    if (formData.batteryVoltage && !/^\d+$/.test(formData.batteryVoltage)) {
      newErrors.batteryVoltage = '배터리 전력은 숫자만 입력 가능합니다.';
      isValid = false;
    }

    if (!formData.fuelType) {
      newErrors.fuelType = '연료 유형을 선택해주세요.';
      isValid = false;
    }
    if (!formData.transmissionType) {
      newErrors.transmissionType = '변속기를 선택해주세요.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  /**
   * 폼 제출을 처리합니다.
   * 유효성 검사를 수행하고, 통과하면 차량 등록 API를 호출합니다.
   * 로딩 상태 및 토스트 알림을 관리합니다.
   * @returns 등록 성공 여부
   */
  const handleSubmit = useCallback(async () => {
    const isValid = validateForm();
    if (!isValid) {
      toast.info('필수 입력 항목을 확인해주세요.');
      return false;
    }

    showLoading();
    try {
      const requestData = {
        registrationNumber: formData.registrationNumber,
        modelYear: formData.modelYear,
        manufacturer: formData.manufacturer,
        modelName: formData.modelName,
        batteryVoltage: formData.batteryVoltage,
        fuelType: formData.fuelType,
        transmissionType: formData.transmissionType,
        memo: formData.memo,
      };

      await registerVehicle(requestData);
      toast.success('차량 정보가 성공적으로 저장되었습니다.');
      return true;
    } catch (error) {
      toast.error('차량 등록 중 오류가 발생했습니다.');
      console.error('Vehicle registration failed:', error);
      return false;
    } finally {
      hideLoading();
    }
  }, [formData, validateForm, showLoading, hideLoading]);

  /**
   * 폼 데이터와 에러 상태를 초기값으로 리셋합니다.
   */
  const resetForm = useCallback(() => {
    setFormData({
      registrationNumber: '',
      modelYear: '',
      manufacturer: '',
      modelName: '',
      batteryVoltage: '',
      fuelType: '',
      transmissionType: '',
      memo: '',
    });
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
    resetForm,
  };
};
