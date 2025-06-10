import React, { useState, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';

import {
  StyledDateTimeInputContainer,
  CalendarIconContainer,
  FieldContainer,
  StyledLabel,
} from './DateTimeInput.styles';
import type { DateTimeInputProps } from './types';
import { Text } from '@/components/ui/text/Text';

import CalendarIcon from '@/assets/icons/ic-calendar.svg?react';

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
  id,
  label,
  selectedDate, // 단일 날짜로 변경
  onDateChange, // 단일 날짜 변경 핸들러로 변경
  placeholder = 'YYYY.MM.DD HH:MM', // 시간 포함 플레이스홀더
  width,
  disabled = false,
  readOnly = false,
  required = false, // 필수 필드 여부 추가
  errorText, // 에러 메시지 추가
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleDateChange = useCallback(
    (date: Date | null) => {
      onDateChange(date); // 단일 날짜만 전달
    },
    [onDateChange]
  );

  // 달력 팝업이 열릴 때 호출
  const handleCalendarOpen = useCallback(() => {
    setIsFocused(true);
  }, []);

  // 달력 팝업이 닫힐 때 호출
  const handleCalendarClose = useCallback(() => {
    setIsFocused(false);
  }, []);

  // 표시 형식: 날짜와 시간
  const formatSelectedDate = () => {
    if (selectedDate) {
      return format(selectedDate, 'yyyy.MM.dd HH:mm', { locale: ko });
    }
    return placeholder;
  };

  const isDisabledOrReadOnly = disabled || readOnly;
  const isError = !!errorText; // 에러 텍스트 유무로 에러 상태 판단

  // 고유 ID 생성 (id prop이 없을 경우)
  const uniqueId = id || `date-time-input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <FieldContainer $width={width}>
      {label && (
        <StyledLabel htmlFor={uniqueId}>
          <Text type="label">
            {label}
            {required && <span style={{ color: 'var(--color-red)', marginLeft: '4px' }}>*</span>}
          </Text>
        </StyledLabel>
      )}
      <StyledDateTimeInputContainer
        $width={width}
        $isDisabledOrReadOnly={isDisabledOrReadOnly}
        $isFocused={isFocused}
        $isError={isError} // 에러 상태 prop 전달
        id={uniqueId} // id prop을 container에 적용
      >
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy.MM.dd HH:mm" // 날짜와 시간 형식 지정
          placeholderText={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          showPopperArrow={false}
          onCalendarOpen={handleCalendarOpen}
          onCalendarClose={handleCalendarClose}
          className="react-datepicker-custom-input"
          locale={ko}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={10}
          timeCaption="시간"
          customInput={<span style={{ flexGrow: 1 }}>{formatSelectedDate()}</span>}
        />
        <CalendarIconContainer>
          <CalendarIcon />
        </CalendarIconContainer>
      </StyledDateTimeInputContainer>
      {isError && (
        <Text type="error" style={{ marginLeft: '4px' }}>
          {errorText}
        </Text>
      )}
    </FieldContainer>
  );
};

DateTimeInput.displayName = 'DateTimeInput';
