import type React from 'react';

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'> {
  label?: string;
  initialValue?: string; // textarea는 일반적으로 string만 받음
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void; // Enter 키 이벤트 (줄바꿈이 아닌 특정 동작 시)
  width?: string; // FieldContainer의 min-width를 위한 prop
  minHeight?: string; // TextArea 최소 높이
  maxHeight?: string; // TextArea 최대 높이
}

export interface FieldContainerProps {
  $width?: string;
  $minHeight?: string; // TextArea를 위한 FieldContainer의 최소 높이
  $maxHeight?: string; // TextArea를 위한 FieldContainer의 최대 높이
}

export interface InputWrapperProps extends React.ComponentPropsWithoutRef<'div'> {
  $isFocused: boolean;
  $isDisabled: boolean;
  $isReadOnly: boolean;
  // IconContainer가 없으므로 $hasIcon 제거
}
