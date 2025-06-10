import type React from 'react';

// =========================================================
// 스타일 관련 타입
// =========================================================
export interface FieldContainerProps {
  $width?: string;
}

export interface InputWrapperProps {
  $isFocused?: boolean;
  $hasIcon?: boolean;
  $isDisabled?: boolean;
  $isReadOnly?: boolean;
  $isError?: boolean;
  $isOptionsOpen?: boolean;
}

export interface OptionItemProps {
  $isHighlighted?: boolean;
  $isDisabled?: boolean;
}

// =========================================================
// 컴포넌트 관련 타입
// =========================================================

// SearchInputOption: 드롭다운에 표시될 각 항목의 타입
// T는 API 응답에서 받은 개별 데이터 항목의 타입을 나타냅니다.
export type SearchInputOption<T> = {
  label: string; // 사용자에게 보여줄 텍스트 (예: "홍길동 - 010-1234-5678")
  value: string | number; // 실제 선택될 값 (주로 ID)
  item: T; // 선택된 항목의 전체 데이터 객체
};

// SearchInputProps: SearchInput 컴포넌트의 props 타입
// HTMLInputElement의 모든 표준 속성을 상속받도록 변경
export interface SearchInputProps<T extends object = Record<string, unknown>>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'onFocus' | 'onBlur' | 'id'> {
  id?: string;
  width?: string;
  label?: string;
  icon?: React.ReactNode;
  value?: string; // 현재 텍스트 인풋 값 (외부에서 제어 시 사용)
  placeholder?: string;
  errorText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  debounceTime?: number;

  // API 호출 함수: query를 받아 SearchInputOption<T>[]를 반환하는 비동기 함수
  fetchOptions: (query: string, signal?: AbortSignal) => Promise<SearchInputOption<T>[]>;

  // 옵션 선택 시 호출될 콜백. 선택된 항목의 value (ID)만 전달
  onChange?: (selectedValue: string | number | null) => void;

  // 텍스트 인풋 값 변경 시 호출될 콜백 (디바운싱 전)
  onInputChange?: (value: string) => void; // 현재 사용되지 않음

  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
