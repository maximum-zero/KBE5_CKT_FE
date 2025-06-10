import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { BasicButton } from '@/components/ui/button/BasicButton';
import { Popup } from '@/components/ui/modal/popup/Popup';
import { Text } from '@/components/ui/text/Text';
import { TextArea } from '@/components/ui/input/textarea/TextArea';
import { DateTimeInput } from '@/components/ui/input/date-time/DateTimeInput';
import { MiniButton } from '@/components/ui/button/MiniButton';

import { formatDateTime } from '@/utils/date';

import EditIcon from '@/assets/icons/ic-edit.svg?react';

import { SearchText } from './components/SearchText';
import { VehicleSearchItem } from './components/VehicleSearchItem';
import { CustomerSelectedItem } from './components/CustomerSelectedItem';
import { CustomerSearchItem } from './components/CustomerSearchItem';
import { VehicleSelectedItem } from './components/VehicleSelectedItem';

import type { SearchCustomerSummary, SearchVehicleSummary } from './types';
import { FormFieldWrapper, FormRow, FormSection, FormTitleWrapper, MemoSection } from './RentalRegisterPopup.styles';
import { useRentalRegister } from './hooks/useRentalRegister';
import { fetchSearchCustomer, fetchSearchVehicle } from './api/rental-api';

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
  const { formData, errors, handleInputChange, handleSubmit, resetForm, isAvailableVehicleSearch } =
    useRentalRegister();

  // -----------------------------------------------------------------------
  // 핸들러 함수들
  // -----------------------------------------------------------------------
  const handleClickCustomer = (item: SearchCustomerSummary) => {
    handleInputChange('customer', item);
  };

  const handleClickVehicle = (item: SearchVehicleSummary) => {
    handleInputChange('vehicle', item);
  };

  const handleCancelCustomer = () => {
    handleInputChange('customer', null);
  };

  const handleCancelVehicle = () => {
    handleInputChange('vehicle', null);
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

  const isSelectedCustomer = formData.customer;
  const isSelectedVehicle = formData.vehicle;

  // -----------------------------------------------------------------------
  // 렌더링
  // -----------------------------------------------------------------------
  return (
    <Popup isOpen={isOpen} onClose={handleCancel} title="예약 등록" actionButtons={popupActionButtons}>
      {/* --- 예약 정보 섹션 --- */}
      <FormSection>
        <Text type="subheading2">예약 정보</Text>
        <FormRow>
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
      {/* --- 고객 정보 섹션 --- */}
      <FormSection>
        <FormTitleWrapper>
          <Text type="subheading2">고객 정보</Text>
          {isSelectedCustomer && (
            <MiniButton icon={<EditIcon />} $buttonType="light-gray" onClick={handleCancelCustomer}>
              변경
            </MiniButton>
          )}
        </FormTitleWrapper>
        <FormFieldWrapper>
          {isSelectedCustomer ? (
            <CustomerSelectedItem item={formData.customer!} />
          ) : (
            <SearchText
              id="customer-search"
              placeholder="고객명 또는 전화번호로 검색"
              fetch={fetchSearchCustomer}
              renderResults={results =>
                results &&
                results.map((item: any) => (
                  <CustomerSearchItem key={item.id} item={item} onClick={handleClickCustomer} />
                ))
              }
            />
          )}
        </FormFieldWrapper>
      </FormSection>

      {/* --- 차량 정보 섹션 --- */}
      <AnimatePresence initial={false}>
        {isAvailableVehicleSearch() && (
          <motion.div
            key="vehicle-section"
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.3 }}
          >
            <FormSection>
              <FormTitleWrapper>
                <Text type="subheading2">차량 정보</Text>
                {isSelectedVehicle && (
                  <MiniButton icon={<EditIcon />} $buttonType="light-gray" onClick={handleCancelVehicle}>
                    변경
                  </MiniButton>
                )}
              </FormTitleWrapper>
              <FormFieldWrapper>
                <AnimatePresence mode="wait">
                  {isSelectedVehicle ? (
                    <motion.div
                      key="vehicle-selected-item"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      layout
                    >
                      <VehicleSelectedItem item={formData.vehicle!} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="vehicle-search-input"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      layout
                    >
                      <SearchText
                        id="vehcle-search"
                        placeholder="차량번호 또는 모델명으로 검색"
                        fetch={(query, signal) =>
                          fetchSearchVehicle(
                            formatDateTime(formData.pickupAt)!,
                            formatDateTime(formData.returnAt)!,
                            query,
                            signal
                          )
                        }
                        renderResults={results =>
                          results &&
                          results.map((item: SearchVehicleSummary) => (
                            <VehicleSearchItem key={item.id} item={item} onClick={handleClickVehicle} />
                          ))
                        }
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </FormFieldWrapper>
            </FormSection>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 추가 정보 섹션 --- */}
      <FormSection>
        <Text type="subheading2">비고</Text>
        <MemoSection>
          <TextArea
            id="memo"
            placeholder="특이사항을 입력하세요"
            onChange={value => handleInputChange('memo', value)}
            value={formData.memo}
            minHeight="120px"
          />
        </MemoSection>
      </FormSection>
    </Popup>
  );
};
