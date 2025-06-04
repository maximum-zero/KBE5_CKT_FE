import React, { useState, useCallback, useRef, useEffect, memo } from 'react';

import { FieldContainer, StyledLabel, InputWrapper, StyledInput, IconContainer } from './TextInput.styles';
import type { TextInputProps } from './types';

export const TextInput: React.FC<TextInputProps> = memo(
  ({
    label,
    icon,
    disabled = false,
    readOnly = false,
    onFocus,
    onBlur,
    onChange,
    onEnter,
    initialValue = '',
    id,
    width,
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
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
          debounceTimer.current = null;
        }
      },
      [onBlur]
    );

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        // disabled 또는 readOnly 상태일 때는 변경 이벤트 무시
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
        }, 300);
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

    return (
      <FieldContainer $width={width}>
        {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
        <InputWrapper $isFocused={isFocused} $hasIcon={!!icon} $isDisabled={disabled} $isReadOnly={readOnly}>
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
      </FieldContainer>
    );
  }
);

TextInput.displayName = 'TextInput';
