import { useCallback } from 'react';

import { BasicButton } from '@/components/ui/button/BasicButton';
import { Popup } from '@/components/ui/modal/popup/Popup';
import { Text } from '@/components/ui/text/Text';
import { TextArea } from '@/components/ui/input/textarea/TextArea';

import { FormFieldWrapper, FormRow, FormSection, MemoSection } from './RentalRegisterPopup.styles';
import { useRentalRegister } from './hooks/useRentalRegister';
import { SearchInput } from '@/components/ui/input/search/SearchInput';
import type { SearchCustomerSummary, SearchVehicleSummary } from './types';
import { fetchSearchCustomer, fetchSearchVehicle } from './api/rental-api';
import type { SearchInputOption } from '@/components/ui/input/search/types';
import { DateTimeInput } from '@/components/ui/input/date-time/DateTimeInput';

// --- RentalRegisterPopup 컴포넌트의 props 인터페이스 정의 ---
interface RentalRegisterPopupProps {
  isOpen: boolean; // 팝업이 현재 열려 있는지 여부
  onClose: (success?: boolean) => void; // 팝업이 닫힐 때 호출될 콜백 함수 (등록 성공 여부 전달)
}

/**
 * 예약 등록을 위한 팝업 컴포넌트입니다.
 * 사용자로부터 예약 정보를 입력받아 등록 처리하며, `useRentalRegister` 훅을 통해 폼 로직을 관리합니다.
 */

export const RentalRegisterPopup: React.FC<RentalRegisterPopupProps> = ({ isOpen, onClose }) => {
  // -----------------------------------------------------------------------
  // 🚀 폼 관련 상태 및 함수 가져오기 (useRentalRegister 훅 활용)
  // -----------------------------------------------------------------------
  const { formData, errors, handleInputChange, handleSubmit, resetForm } = useRentalRegister();

  // -----------------------------------------------------------------------
  // 핸들러 함수들
  // -----------------------------------------------------------------------
  /**
   * 상태(Status) 드롭다운 선택 시 필터 업데이트.
   * @param value 선택된 상태 값 (string 또는 number)
   */
  const handleCustomerChange = useCallback(
    (value: string | number | null) => {
      console.log('value > ', value);

      handleInputChange('customerId', value);
    },
    [handleInputChange]
  );

  /**
   * 상태(Status) 드롭다운 선택 시 필터 업데이트.
   * @param value 선택된 상태 값 (string 또는 number)
   */
  const handleVehicleChange = useCallback(
    (value: string | number | null) => {
      handleInputChange('vehicleId', value);
    },
    [handleInputChange]
  );

  const fetchedSearchCustomer = async (
    query: string,
    signal?: AbortSignal
  ): Promise<SearchInputOption<SearchCustomerSummary>[]> => {
    const response = await fetchSearchCustomer(query, signal);
    return response.list.map((customer: SearchCustomerSummary) => ({
      label: `${customer.customerName}`,
      value: customer.id,
      item: customer,
    }));
  };

  const fetchedSearchVehicle = async (
    query: string,
    signal?: AbortSignal
  ): Promise<SearchInputOption<SearchVehicleSummary>[]> => {
    const response = await fetchSearchVehicle(query, signal);
    return response.list.map((vehicle: SearchVehicleSummary) => ({
      label: `${vehicle.registrationNumber}`,
      value: vehicle.id,
      item: vehicle,
    }));
  };

  /**
   * '등록' 버튼 클릭 시 호출되는 핸들러 함수.
   * 폼 유효성 검사 후 데이터 제출을 시도하고, 성공 시 폼을 리셋하고 팝업을 닫습니다.
   */
  const handleRegister = useCallback(async () => {
    const isSuccess = await handleSubmit();
    if (isSuccess) {
      resetForm();
      onClose(true);
    }
  }, [handleSubmit, resetForm, onClose]);

  /**
   * '취소' 버튼 클릭 시 또는 팝업 외부 영역 클릭 시 호출되는 핸들러 함수.
   * 폼을 리셋하고 팝업을 닫습니다. (등록 실패/취소로 간주)
   */
  const handleCancel = useCallback(() => {
    resetForm();
    onClose(false);
  }, [resetForm, onClose]);

  // --- 팝업 하단에 표시될 액션 버튼들 ---
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

  // -----------------------------------------------------------------------
  // 렌더링
  // -----------------------------------------------------------------------
  return (
    <Popup isOpen={isOpen} onClose={handleCancel} title="예약 등록" actionButtons={popupActionButtons}>
      {/* --- 기본 정보 섹션 --- */}
      <FormSection>
        <Text type="subheading2">기본 정보</Text>
        <FormRow>
          <FormFieldWrapper>
            <SearchInput<SearchCustomerSummary>
              id="customer-search"
              label="사용자"
              placeholder="사용자명를 입력하세요"
              onChange={handleCustomerChange}
              fetchOptions={fetchedSearchCustomer}
              errorText={errors.customerId}
              debounceTime={400}
              required
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <SearchInput<SearchVehicleSummary>
              id="vehcle-search"
              label="차량 등록 번호"
              placeholder="예약할 차량 등록 번호를 입력하세요"
              onChange={handleVehicleChange}
              fetchOptions={fetchedSearchVehicle}
              errorText={errors.vehicleId}
              debounceTime={400}
              required
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <DateTimeInput
              label="픽업 시간"
              selectedDate={formData.pickupAt}
              onDateChange={value => handleInputChange('pickupAt', value)}
              placeholder="예약 날짜를 선택하세요"
              errorText={errors.pickupAt}
              required
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <DateTimeInput
              label="반납 시간"
              selectedDate={formData.returnAt}
              onDateChange={value => handleInputChange('returnAt', value)}
              placeholder="예약 날짜를 선택하세요"
              required
              errorText={errors.returnAt}
            />
          </FormFieldWrapper>
        </FormRow>
      </FormSection>

      {/* --- 추가 정보 섹션 --- */}
      <FormSection>
        <Text type="subheading2">추가 정보</Text>
        <MemoSection>
          <TextArea
            id="memo"
            label="특이사항"
            placeholder="차량에 대한 특이사항을 입력하세요"
            onChange={value => handleInputChange('memo', value)}
            value={formData.memo}
            minHeight="120px"
          />
        </MemoSection>
      </FormSection>
    </Popup>
  );
};
