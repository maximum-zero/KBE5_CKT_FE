export interface DateInputProps {
  id?: string;
  label?: string;
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (dates: { startDate: Date | null; endDate: Date | null }) => void;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export interface FieldContainerProps {
  $width?: string;
}

export interface StyledDateInputContainerProps {
  $isDisabledOrReadOnly: boolean;
  $width?: string;
  $isFocused?: boolean; // 포커스 상태를 위한 prop
}
