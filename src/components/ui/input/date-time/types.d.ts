// =========================================================
// 컴포넌트 props 타입
// =========================================================
export interface DateTimeInputProps {
  id?: string;
  label?: string;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  errorText?: string;
}

// =========================================================
// Styled Components props 타입
// =========================================================
export interface FieldContainerProps {
  $width?: string;
}

export interface StyledDateTimeInputContainerProps {
  $isDisabledOrReadOnly: boolean;
  $width?: string;
  $isFocused?: boolean;
  $isError?: boolean;
}
