import React, { useState, useCallback, useRef, useEffect, memo } from 'react';

import { FieldContainer, StyledLabel, InputWrapper, StyledInput, IconContainer } from './TextInput.styles';
import type { TextInputProps } from './types';

export const TextInput: React.FC<TextInputProps> = memo(
  ({ label, icon, disabled = false, onFocus, onBlur, onChange, initialValue = '', id, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [currentValue, setCurrentValue] = useState<string | number | readonly string[]>(initialValue);
    const isInitialRender = useRef(true);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null); // 디바운싱 타이머 useRef

    useEffect(() => {
      if (isInitialRender.current) {
        setCurrentValue(initialValue);
        isInitialRender.current = false;
      }
    }, [initialValue]);

    useEffect(() => {
      return () => {
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }
      };
    }, []);

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
          debounceTimer.current = null;
        }
      },
      [onBlur]
    );

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setCurrentValue(newValue);

        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
          onChange?.(newValue);
        }, 300);
      },
      [onChange]
    );

    return (
      <FieldContainer>
        {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
        <InputWrapper $isFocused={isFocused} $isDisabled={disabled} $hasIcon={!!icon}>
          <StyledInput
            id={id}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleInputChange}
            value={currentValue}
            disabled={disabled}
            {...props}
          />
          {icon && <IconContainer>{icon}</IconContainer>}
        </InputWrapper>
      </FieldContainer>
    );
  }
);

TextInput.displayName = 'TextInput';
