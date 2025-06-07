import React, { useState, useRef, useEffect, useCallback } from 'react';

import {
  SelectedValueText,
  DropdownIcon,
  StyledDropdownContainer,
  OptionsList,
  OptionItem,
  FieldContainer,
  StyledLabel,
} from './Dropdown.styles';
import type { DropdownOption, DropdownProps } from './types';
import { Text } from '@/components/ui/text/Text';

import DropdownArrowIcon from '@/assets/icons/ic-dropdown.svg?react';

export const Dropdown: React.FC<DropdownProps> = ({
  id,
  label,
  options,
  initialValue,
  placeholder = '전체',
  onSelect,
  width,
  disabled = false,
  readOnly = false,
  required = false, // required prop 추가
  errorText, // errorText prop 추가
}) => {
  const [displayLabel, setDisplayLabel] = useState<string | undefined>(() => {
    return initialValue ? options.find(opt => opt.value === initialValue)?.label : placeholder;
  });

  const [selectedValue, setSelectedValue] = useState<string | number | undefined>(initialValue);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isDisabledOrReadOnly = disabled || readOnly;
  const isError = !!errorText; // 에러 텍스트가 있으면 true

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const newDisplayLabel = initialValue ? options.find(opt => opt.value === initialValue)?.label : placeholder;
    if (newDisplayLabel !== displayLabel || initialValue !== selectedValue) {
      setSelectedValue(initialValue);
      setDisplayLabel(newDisplayLabel);
    }
  }, [initialValue, options, placeholder, displayLabel, selectedValue]);

  const handleToggle = useCallback(() => {
    if (!isDisabledOrReadOnly) {
      setIsOpen(prev => !prev);
    }
  }, [isDisabledOrReadOnly]);

  const handleSelectOption = useCallback(
    (option: DropdownOption) => {
      if (isDisabledOrReadOnly) return;

      setSelectedValue(option.value);
      setDisplayLabel(option.label);
      setIsOpen(false);
      if (onSelect) {
        onSelect(option.value);
      }
    },
    [onSelect, isDisabledOrReadOnly]
  );

  return (
    <FieldContainer $width={width}>
      {label && (
        <StyledLabel htmlFor={id || `dropdown-${Math.random().toString(36).substr(2, 9)}`}>
          <Text type="label">
            {label}
            {required && <span style={{ color: 'var(--color-red)', marginLeft: '4px' }}>*</span>}
          </Text>
        </StyledLabel>
      )}
      <StyledDropdownContainer
        ref={dropdownRef}
        onClick={handleToggle}
        $width={width}
        $isDisabledOrReadOnly={isDisabledOrReadOnly}
        $isOpen={isOpen}
        $isError={isError} // 에러 상태 전달
        tabIndex={isDisabledOrReadOnly ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        id={id}
      >
        <SelectedValueText>{displayLabel}</SelectedValueText>
        <DropdownIcon $isOpen={isOpen}>
          <DropdownArrowIcon />
        </DropdownIcon>
        {isOpen && (
          <OptionsList role="listbox">
            {options.map(option => (
              <OptionItem
                key={option.value}
                onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                  e.stopPropagation();
                  handleSelectOption(option);
                }}
                role="option"
                aria-selected={option.value === selectedValue}
              >
                {option.label}
              </OptionItem>
            ))}
          </OptionsList>
        )}
      </StyledDropdownContainer>
      {isError && (
        <Text type="error" style={{ marginLeft: '4px' }}>
          {errorText}
        </Text>
      )}
    </FieldContainer>
  );
};

Dropdown.displayName = 'Dropdown';
