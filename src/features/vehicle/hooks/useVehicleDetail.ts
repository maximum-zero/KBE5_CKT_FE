import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useLoading } from '@/context/LoadingContext';

import { getVehicleDetail, updateVehicle, deleteVehicle } from '../api/vehicle-api';
import type { Vehicle, RegisterVehicleRequest } from '../api/types';
import type { UseDetailPanelReturn } from '../types';

export const useDetailPanel = (): UseDetailPanelReturn => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<Vehicle | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const { showLoading, hideLoading } = useLoading();

  const openPanel = useCallback((id: number) => {
    setSelectedItemId(id);
    setDetailError(null);
  }, []);

  const closePanel = useCallback(() => {
    setSelectedItemId(null);
    setSelectedItem(null);
    setDetailError(null);
  }, []);

  useEffect(() => {
    const fetchDetail = async () => {
      if (selectedItemId === null) {
        setSelectedItem(null);
        return;
      }

      setIsLoadingDetail(true);
      setDetailError(null);

      try {
        const data = await getVehicleDetail(selectedItemId);
        setSelectedItem(data);
      } catch (err) {
        console.error('Failed to fetch vehicle detail:', err);
        setDetailError('상세 정보를 불러오는데 실패했습니다.');
        setSelectedItem(null);
        toast.error('상세 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoadingDetail(false);
      }
    };

    fetchDetail();
  }, [selectedItemId, showLoading, hideLoading]);

  const handleUpdateVehicle = useCallback(
    async (vehicleData: Vehicle): Promise<Vehicle | undefined> => {
      if (selectedItemId === null || vehicleData.id === undefined) {
        toast.error('수정할 차량 ID가 유효하지 않습니다.');
        return undefined;
      }

      const requestDataForApi: RegisterVehicleRequest = {
        registrationNumber: vehicleData.registrationNumber,
        modelYear: vehicleData.modelYear,
        manufacturer: vehicleData.manufacturer,
        modelName: vehicleData.modelName,
        batteryVoltage: String(vehicleData.batteryVoltage ?? ''),
        fuelType: vehicleData.fuelType,
        transmissionType: vehicleData.transmissionType,
        memo: vehicleData.memo ?? '',
      };

      showLoading();
      try {
        const updatedData = await updateVehicle(selectedItemId, requestDataForApi);
        setSelectedItem(updatedData);
        toast.success('차량 정보가 성공적으로 저장되었습니다.');
        return updatedData;
      } catch (error: unknown) {
        console.error('차량 정보 저장 실패:', error);
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
        toast.error(`차량 정보 저장에 실패했습니다: ${errorMessage}`);
        return undefined;
      } finally {
        hideLoading();
      }
    },
    [selectedItemId, showLoading, hideLoading]
  );

  const handleDeleteVehicle = useCallback(async (): Promise<boolean> => {
    if (selectedItemId === null) {
      toast.error('삭제할 차량 ID가 유효하지 않습니다.');
      return false;
    }

    showLoading();
    try {
      await deleteVehicle(selectedItemId);
      setSelectedItem(null);
      setSelectedItemId(null);
      toast.success('차량 정보가 성공적으로 삭제되었습니다.');
      return true;
    } catch (error: unknown) {
      console.error('차량 삭제 실패:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      toast.error(`차량 삭제에 실패했습니다: ${errorMessage}`);
      return false;
    } finally {
      hideLoading();
    }
  }, [selectedItemId, showLoading, hideLoading]);

  return {
    selectedItem,
    openPanel,
    closePanel,
    isLoadingDetail,
    detailError,
    handleUpdateVehicle,
    handleDeleteVehicle,
  };
};
