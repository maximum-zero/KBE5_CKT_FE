import React from 'react';

import { Popup } from '@/components/ui/modal/popup/Popup';
import { Text } from '@/components/ui/text/Text';
import { TextInput } from '@/components/ui/input/input/TextInput';
import { Dropdown } from '@/components/ui/input/dropdown/Dropdown';
import { BasicButton } from '@/components/ui/button/BasicButton';
import { FormRow, FormSection, FormFieldWrapper, MemoSection } from './VehicleRegisterPopup.styles';
import { TextArea } from '@/components/ui/input/textarea/TextArea';

import { useVehicleRegister } from './hooks/useVehicleReigster';
import { FUEL_TYPE_OPTIONS, TRANSMISSION_TYPE_OPTIONS } from './types';

interface VehicleRegisterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VehicleRegisterPopup: React.FC<VehicleRegisterPopupProps> = ({ isOpen, onClose }) => {
  const { formData, errors, handleInputChange, handleSubmit, resetForm } = useVehicleRegister();

  const handleRegister = async () => {
    const isSuccess = await handleSubmit();
    if (isSuccess) {
      resetForm();
      onClose();
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const popupActionButtons = (
    <>
      <BasicButton buttonType="basic" onClick={handleCancel}>
        취소
      </BasicButton>
      <BasicButton buttonType="primary" onClick={handleRegister}>
        등록
      </BasicButton>
    </>
  );

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
      title="차량 등록"
      actionButtons={popupActionButtons}
    >
      <FormSection>
        <Text type="subheading">기본 정보</Text>
        <FormRow>
          <FormFieldWrapper>
            <TextInput
              type="text"
              id="registrationNumber"
              label="차량 번호"
              placeholder="예: 12가 3456"
              onChange={value => handleInputChange('registrationNumber', value)}
              initialValue={formData.registrationNumber}
              onEnter={handleRegister}
              autoFocus
              required={true}
              maxLength={10}
              errorText={errors.registrationNumber}
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <TextInput
              type="text"
              id="modelYear"
              label="연식"
              placeholder="예: 2025"
              onChange={value => handleInputChange('modelYear', value)}
              initialValue={formData.modelYear}
              onEnter={handleRegister}
              required={true}
              maxLength={4}
              errorText={errors.modelYear}
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <TextInput
              type="text"
              id="manufacturer"
              label="제조사"
              placeholder="예: 기아"
              onChange={value => handleInputChange('manufacturer', value)}
              initialValue={formData.manufacturer}
              onEnter={handleRegister}
              required={true}
              maxLength={20}
              errorText={errors.manufacturer}
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <TextInput
              type="text"
              id="modelName"
              label="모델명"
              placeholder="예: 아반떼"
              onChange={value => handleInputChange('modelName', value)}
              initialValue={formData.modelName}
              onEnter={handleRegister}
              required={true}
              maxLength={20}
              errorText={errors.modelName}
            />
          </FormFieldWrapper>
        </FormRow>
      </FormSection>

      <FormSection>
        <Text type="subheading">기술 정보</Text>
        <FormRow>
          <FormFieldWrapper>
            <TextInput
              type="text"
              id="batteryVoltage"
              label="배터리 전력(kWh)"
              placeholder="예: 64"
              onChange={value => handleInputChange('batteryVoltage', value)}
              initialValue={formData.batteryVoltage}
              onEnter={handleRegister}
              maxLength={4}
              errorText={errors.batteryVoltage}
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <Dropdown
              id="fuelType"
              label="연료 유형"
              options={FUEL_TYPE_OPTIONS}
              onSelect={value => handleInputChange('fuelType', value.toString())}
              initialValue={formData.fuelType}
              required={true}
              errorText={errors.fuelType}
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <Dropdown
              id="transmissionType"
              label="변속기"
              options={TRANSMISSION_TYPE_OPTIONS}
              onSelect={value => handleInputChange('transmissionType', value.toString())}
              initialValue={formData.transmissionType}
              required={true}
              errorText={errors.transmissionType}
            />
          </FormFieldWrapper>
        </FormRow>
      </FormSection>

      <FormSection>
        <Text type="subheading">추가 정보</Text>
        <MemoSection>
          <TextArea
            id="memo"
            label="특이사항"
            placeholder="차량에 대한 특이사항을 입력하세요"
            onChange={value => handleInputChange('memo', value)}
            initialValue={formData.memo}
            minHeight="120px"
          />
        </MemoSection>
      </FormSection>
    </Popup>
  );
};
