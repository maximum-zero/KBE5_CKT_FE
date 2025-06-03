import type React from 'react';

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'disabled'> {
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  initialValue?: string | number | readonly string[];
  onChange?: (value: string) => void;
}

export interface InputWrapperProps extends React.ComponentPropsWithoutRef<'div'> {
  $hasIcon: boolean;
  $isFocused: boolean;
  $isDisabled: boolean;
}
