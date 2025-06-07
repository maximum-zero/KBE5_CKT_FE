// src/components/ui/input/input/TextInput.tsx

import React, { useState, useCallback, useRef, useEffect, memo } from 'react';

import { FieldContainer, StyledLabel, InputWrapper, StyledInput, IconContainer } from './TextInput.styles';
import type { TextInputProps } from './types';
import { Text } from '@/components/ui/text/Text'; // Text 컴포넌트 임포트

export const TextInput: React.FC<TextInputProps> = memo(
  ({
    id,
    width,
    label,
    icon,
    initialValue = '',
    errorText,
    disabled = false,
    readOnly = false,
    required = false,
    onFocus,
    onBlur,
    onChange,
    onEnter,
    ...props
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [currentValue, setCurrentValue] = useState<string | number | readonly string[]>(initialValue);
    const isInitialRender = useRef(true);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    // initialValue가 변경될 때마다 currentValue를 업데이트 (초기 렌더링 시에만)
    useEffect(() => {
      if (isInitialRender.current) {
        setCurrentValue(initialValue);
        isInitialRender.current = false;
      }
    }, [initialValue]);

    // 컴포넌트 언마운트 시 디바운스 타이머 클리어
    useEffect(() => {
      return () => {
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }
      };
    }, []);

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (disabled || readOnly) {
          return;
        }
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus, disabled, readOnly]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled || readOnly) {
          return;
        }
        const newValue = e.target.value;
        setCurrentValue(newValue);

        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
          onChange?.(newValue);
        }, 100);
      },
      [onChange, disabled, readOnly]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled || readOnly) {
          return;
        }
        if (e.key === 'Enter') {
          onEnter?.(currentValue as string);
        }
      },
      [disabled, readOnly, onEnter, currentValue]
    );

    const isError = !!errorText;

    return (
      <FieldContainer $width={width}>
        {label && (
          <StyledLabel htmlFor={id}>
            <Text type="label">
              {label}
              {required && <span style={{ color: 'var(--color-red)', marginLeft: '4px' }}>*</span>}
            </Text>
          </StyledLabel>
        )}
        <InputWrapper
          $isFocused={isFocused}
          $hasIcon={!!icon}
          $isDisabled={disabled}
          $isReadOnly={readOnly}
          $isError={isError}
        >
          <StyledInput
            id={id}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={currentValue}
            disabled={disabled}
            readOnly={readOnly}
            {...props}
          />
          {icon && <IconContainer>{icon}</IconContainer>}
        </InputWrapper>
        {isError && (
          <Text type="error" style={{ marginLeft: '4px' }}>
            {' '}
            {/* 에러 텍스트 마진 추가 */}
            {errorText}
          </Text>
        )}
      </FieldContainer>
    );
  }
);

TextInput.displayName = 'TextInput';
