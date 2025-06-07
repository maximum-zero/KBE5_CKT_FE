import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';

import { SlidePanel } from '@/components/ui/modal/slide-panel/SlidePanel';
import { BasicButton } from '@/components/ui/button/BasicButton';
import { Badge } from '@/components/ui/badge/Badge';
import { TextInput } from '@/components/ui/input/input/TextInput';
import { Dropdown } from '@/components/ui/input/dropdown/Dropdown';
import { Text } from '@/components/ui/text/Text';
import { TextArea } from '@/components/ui/input/textarea/TextArea';

import {
  PanelWrapper,
  PanelSection,
  PanelRowContainer,
  PanelRowSection,
  PanelLabelContainer,
  PanelValueContainer,
  AnimatedSection,
  MapContainer,
} from '@/components/ui/modal/slide-panel/SlidePanel.styles';

import { FUEL_TYPE_OPTIONS, TRANSMISSION_TYPE_OPTIONS } from './types';
import { useDetailPanel } from './hooks/useVehicleDetail';
import type { Vehicle } from './api/types';
import { useConfirm } from '@/hooks/useConfirm';

interface VehicleDetailPanelProps {
  vehicleId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccessSave?: () => void;
}

export const VehicleDetailPanel: React.FC<VehicleDetailPanelProps> = ({
  vehicleId,
  isOpen,
  onClose,
  onSuccessSave,
}) => {
  const { confirm } = useConfirm();

  const {
    selectedItem,
    openPanel,
    closePanel,
    isLoadingDetail,
    detailError,
    handleUpdateVehicle,
    handleDeleteVehicle,
  } = useDetailPanel();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedVehicle, setEditedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    if (isOpen && vehicleId !== null) {
      openPanel(vehicleId);
      setIsEditMode(false);
    } else if (!isOpen) {
      closePanel();
      setEditedVehicle(null);
      setIsEditMode(false);
    }
  }, [isOpen, vehicleId, openPanel, closePanel]);

  useEffect(() => {
    if (selectedItem) {
      setEditedVehicle(selectedItem);
    }
  }, [selectedItem]);

  const handleEdit = useCallback(() => {
    setIsEditMode(true);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!editedVehicle || editedVehicle.id === undefined) {
      toast.error('삭제할 차량 정보가 유효하지 않습니다.');
      return;
    }

    const isConfirmed = await confirm({
      title: '차량 삭제',
      content: `차량 등록번호 ${editedVehicle.registrationNumber}을(를) 정말 삭제하시겠습니까?`,
      confirmText: '삭제',
      cancelText: '취소',
    });

    if (!isConfirmed) {
      return;
    }

    const success = await handleDeleteVehicle();
    if (success) {
      onSuccessSave?.();
      onClose();
    }
  }, [editedVehicle, handleDeleteVehicle, onClose, onSuccessSave]);

  const handleSave = useCallback(async () => {
    if (!editedVehicle) {
      toast.error('저장할 차량 정보가 유효하지 않습니다.');
      return;
    }

    const result = await handleUpdateVehicle(editedVehicle);
    if (result) {
      setIsEditMode(false);
      onSuccessSave?.();
      onClose();
    }
  }, [editedVehicle, handleUpdateVehicle, onClose, onSuccessSave]);

  const handleCancel = useCallback(() => {
    if (selectedItem) {
      setEditedVehicle(selectedItem);
    }
    setIsEditMode(false);
  }, [selectedItem]);

  const handlePanelClose = useCallback(() => {
    setIsEditMode(false);
    onClose();
  }, [onClose]);

  const handleInputChange = useCallback((field: keyof Vehicle, value: string | number) => {
    setEditedVehicle(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value,
      };
    });
  }, []);

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'green';
      case 'IN_USE':
        return 'blue';
      case 'NEEDS_MAINTENANCE':
        return 'red';
      default:
        return 'gray';
    }
  };

  const panelActions = useMemo(() => {
    if (isLoadingDetail || detailError || !selectedItem) {
      return null;
    }

    return (
      <>
        {isEditMode ? (
          <>
            <BasicButton onClick={handleCancel} buttonType="basic">
              취소
            </BasicButton>
            <BasicButton onClick={handleSave} buttonType="primary">
              수정
            </BasicButton>
          </>
        ) : (
          <>
            <BasicButton onClick={handleEdit} buttonType="primary">
              편집
            </BasicButton>
            <BasicButton onClick={handleDelete} buttonType="primary">
              삭제
            </BasicButton>
          </>
        )}
      </>
    );
  }, [isEditMode, selectedItem, isLoadingDetail, detailError, handleEdit, handleDelete, handleSave, handleCancel]);

  const renderPanelRow = useCallback(
    (label: string, text: string | undefined, element: React.ReactNode) => (
      <PanelRowContainer>
        <PanelLabelContainer>
          <Text type="label">{label}</Text>
        </PanelLabelContainer>
        <PanelValueContainer>
          <AnimatedSection $isVisible={isEditMode} $maxHeight="40px">
            {element}
          </AnimatedSection>
          <AnimatedSection $isVisible={!isEditMode} $maxHeight="40px">
            <Text type="body2">{text}</Text>
          </AnimatedSection>
        </PanelValueContainer>
      </PanelRowContainer>
    ),
    [isEditMode]
  );

  const renderPanelContent = () => {
    if (isLoadingDetail) {
      return (
        <PanelWrapper style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Text type="body1">상세 정보를 불러오는 중입니다...</Text>
        </PanelWrapper>
      );
    }

    if (detailError) {
      return (
        <PanelWrapper style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Text type="error">{detailError}</Text>
        </PanelWrapper>
      );
    }

    if (!editedVehicle) {
      return (
        <PanelWrapper style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Text type="body1">차량 정보를 찾을 수 없습니다.</Text>
        </PanelWrapper>
      );
    }

    return (
      <PanelWrapper>
        <PanelSection>
          <PanelSection>
            <PanelRowSection>
              <Text type="subheading">{editedVehicle.registrationNumber}</Text>
              <Badge $badgeColor={getBadgeColor(editedVehicle.status)}>{editedVehicle.statusName}</Badge>
            </PanelRowSection>
          </PanelSection>
          <Text type="subheading2">기본 정보</Text>
          {renderPanelRow(
            '제조사',
            editedVehicle.manufacturer,
            <TextInput
              id="manufacturer"
              value={editedVehicle.manufacturer}
              placeholder="제조사를 입력하세요"
              width="300px"
              onChange={value => handleInputChange('manufacturer', value)}
            />
          )}
          {renderPanelRow(
            '모델명',
            editedVehicle.modelName,
            <TextInput
              id="modelName"
              value={editedVehicle.modelName}
              placeholder="모델명을 입력하세요"
              width="300px"
              onChange={value => handleInputChange('modelName', value)}
            />
          )}
          {renderPanelRow(
            '연식',
            editedVehicle.modelYear,
            <TextInput
              id="modelYear"
              value={editedVehicle.modelYear}
              placeholder="연식을 입력하세요"
              width="300px"
              onChange={value => handleInputChange('modelYear', value)}
            />
          )}
        </PanelSection>

        <PanelSection>
          <Text type="subheading2">기술 정보</Text>
          {renderPanelRow(
            '배터리 전력',
            editedVehicle.batteryVoltage,
            <TextInput
              id="batteryVoltage"
              value={editedVehicle.batteryVoltage ?? ''}
              placeholder="배터리 전력을 입력하세요"
              width="300px"
              onChange={value => handleInputChange('batteryVoltage', value)}
            />
          )}
          {renderPanelRow(
            '연료 유형',
            editedVehicle.fuelType,
            <Dropdown
              id="fuelType"
              options={FUEL_TYPE_OPTIONS}
              value={editedVehicle.fuelType}
              placeholder="연료 유형을 선택하세요"
              width="300px"
              onSelect={value => handleInputChange('fuelType', value.toString())}
            />
          )}
          {renderPanelRow(
            '변속기',
            editedVehicle.transmissionType,
            <Dropdown
              id="transmissionType"
              options={TRANSMISSION_TYPE_OPTIONS}
              value={editedVehicle.transmissionType}
              placeholder="변속기를 선택하세요"
              width="300px"
              onSelect={value => handleInputChange('transmissionType', value.toString())}
            />
          )}
        </PanelSection>

        <AnimatedSection $isVisible={!isEditMode} $maxHeight="500px" $duration="0.3s">
          <PanelSection>
            <Text type="subheading2">현재 위치</Text>
            <MapContainer>지도</MapContainer>
          </PanelSection>
        </AnimatedSection>

        <PanelSection>
          <Text type="subheading2">추가 정보</Text>
          <AnimatedSection $isVisible={isEditMode} $maxHeight="200px">
            <TextArea
              id="memo"
              label="특이사항"
              placeholder="차량에 대한 특이사항을 입력하세요"
              onChange={value => handleInputChange('memo', value)}
              value={editedVehicle.memo}
              minHeight="120px"
            />
          </AnimatedSection>
          <AnimatedSection $isVisible={!isEditMode} $maxHeight="200px">
            <TextArea
              id="memo"
              label="특이사항"
              placeholder="차량에 대한 특이사항을 입력하세요"
              onChange={value => handleInputChange('memo', value)}
              value={editedVehicle.memo}
              minHeight="120px"
              disabled
            />
          </AnimatedSection>
        </PanelSection>
      </PanelWrapper>
    );
  };

  return (
    <SlidePanel isOpen={isOpen} onClose={handlePanelClose} title="차량 상세 정보" actions={panelActions}>
      {renderPanelContent()}
    </SlidePanel>
  );
};
