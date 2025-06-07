import React, { useState, useCallback, useRef, useEffect, memo } from 'react';

import { FieldContainer, StyledLabel, InputWrapper, StyledTextArea } from './TextAres.styles';
import type { TextAreaProps } from './types';

export const TextArea: React.FC<TextAreaProps> = memo(
  ({
    label,
    disabled = false,
    readOnly = false,
    onFocus,
    onBlur,
    onChange,
    initialValue = '',
    id,
    width,
    minHeight = '80px',
    maxHeight,
    ...props
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [currentValue, setCurrentValue] = useState<string>(initialValue as string); // TextArea는 string으로 고정
    const isInitialRender = useRef(true);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null); // textarea 요소 참조

    // initialValue가 변경될 때마다 currentValue를 업데이트 (초기 렌더링 시에만)
    useEffect(() => {
      if (isInitialRender.current) {
        setCurrentValue(initialValue as string);
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

    // focus 이벤트 핸들러
    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (disabled || readOnly) {
          return;
        }
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus, disabled, readOnly]
    );

    // blur 이벤트 핸들러
    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(false);
        onBlur?.(e);
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
          debounceTimer.current = null;
        }
      },
      [onBlur]
    );

    // input 변경 이벤트 핸들러 (디바운스 적용)
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (disabled || readOnly) {
          return;
        }
        const newValue = e.target.value;
        setCurrentValue(newValue);

        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }

        // 100ms 디바운스
        debounceTimer.current = setTimeout(() => {
          onChange?.(newValue);
        }, 100);
      },
      [onChange, disabled, readOnly]
    );

    return (
      <FieldContainer $width={width} $minHeight={minHeight} $maxHeight={maxHeight}>
        {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
        <InputWrapper $isFocused={isFocused} $isDisabled={disabled} $isReadOnly={readOnly}>
          <StyledTextArea
            id={id}
            ref={textAreaRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleInputChange}
            value={currentValue}
            disabled={disabled}
            readOnly={readOnly}
            {...props}
          />
        </InputWrapper>
      </FieldContainer>
    );
  }
);

TextArea.displayName = 'TextArea';
