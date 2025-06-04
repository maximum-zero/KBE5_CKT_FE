import type React from 'react';

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string;
  icon?: React.ReactNode;
  initialValue?: string | number | readonly string[];
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
  width?: string;
}

export interface FieldContainerProps {
  $width?: string;
}

export interface InputWrapperProps extends React.ComponentPropsWithoutRef<'div'> {
  $hasIcon: boolean;
  $isFocused: boolean;
  $isDisabled: boolean;
  $isReadOnly: boolean;
}
