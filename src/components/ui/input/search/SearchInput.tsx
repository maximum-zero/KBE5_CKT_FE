import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import IconClose from '@/assets/icons/ic-close.svg?react'; // SVG 아이콘 import 경로 확인

import { Text } from '@/components/ui/text/Text'; // 경로 확인 필요

import {
  FieldContainer,
  StyledLabel,
  InputWrapper,
  StyledInput,
  IconContainer,
  OptionsList,
  OptionItem,
  ClearButton,
} from './SearchInput.styles';
import type { SearchInputOption, SearchInputProps } from './types'; // types.ts 파일 경로 확인

export const SearchInput = <T extends object = Record<string, unknown>>({
  id,
  width,
  label,
  icon,
  placeholder,
  errorText,
  disabled = false,
  readOnly = false, // 외부에서 readOnly prop으로 제어 가능하도록 유지
  required = false,
  debounceTime = 300,
  fetchOptions,
  onChange,
  onFocus,
  onBlur,
  ...props
}: Omit<SearchInputProps<T>, 'value' | 'onInputChange'>) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<SearchInputOption<T>[]>([]);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedValue, setSelectedValue] = useState<SearchInputOption<T>['value'] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const optionsListRef = useRef<HTMLUListElement>(null);
  const [dropdownRect, setDropdownRect] = useState<DOMRect | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // 옵션 선택 중인지 추적하는 ref (입력값 변경 시 루프 방지)
  const isSelectingAnOption = useRef(false);

  const isError = !!errorText;
  // **핵심 변경:** input의 readOnly 상태는 disabled이거나, 외부 readOnly prop이 true이거나, selectedValue가 존재할 때만 true가 됩니다.
  const isInputReallyReadOnly = disabled || readOnly || selectedValue !== null;

  // --- API 호출 로직 (Debounce 및 AbortController 적용) ---
  const searchOptions = useCallback(
    async (query: string) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      if (!query.trim()) {
        setOptions([]);
        setIsLoading(false);
        setIsOptionsOpen(false);
        setHighlightedIndex(-1);
        abortControllerRef.current = null;
        return;
      }

      setIsLoading(true);
      try {
        const fetchedOptions = await fetchOptions(query, signal);
        setOptions(fetchedOptions);
        if (fetchedOptions.length > 0) {
          setIsOptionsOpen(true);
        } else {
          setIsOptionsOpen(false);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          console.log('Fetch aborted:', query);
        } else {
          console.error('Failed to fetch search options:', err);
          setOptions([]);
          setIsOptionsOpen(false);
        }
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [fetchOptions]
  );

  // --- Input Change 핸들러 ---
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // isInputReallyReadOnly가 true이면, 즉 selectedValue가 있으면 사용자가 직접 입력할 수 없게 되므로 이 핸들러는 호출되지 않습니다.
      // (input 요소에 readOnly 속성이 적용되기 때문)
      // 혹시 모를 경우를 대비하여 추가 방어 로직.
      if (isInputReallyReadOnly) return;

      const newValue = e.target.value;
      setInputValue(newValue);

      // 옵션 선택에 의한 변경이 아니라 사용자가 직접 입력하는 경우에만 selectedValue 초기화 로직 수행
      if (!isSelectingAnOption.current) {
        // 이전에 선택된 값이 있었고, 현재 입력값이 그 선택된 값의 label과 달라진 경우 (새로운 검색 시작)
        // 또는 입력값이 완전히 비워진 경우 (사용자가 직접 지움)
        if (selectedValue !== null) {
          onChange?.(null);
          setSelectedValue(null);
        }
      } else {
        isSelectingAnOption.current = false; // 플래그 초기화
      }

      // 검색어가 비어있으면 옵션 목록을 닫고 하이라이트 초기화
      if (!newValue.trim()) {
        setOptions([]);
        setIsOptionsOpen(false);
        setHighlightedIndex(-1);
      }

      // 디바운스 로직 (API 호출 지연)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        searchOptions(newValue);
      }, debounceTime);
    },
    [isInputReallyReadOnly, debounceTime, searchOptions, onChange, selectedValue]
  );

  // 컴포넌트 언마운트 시 진행 중인 요청 취소 (메모리 누수 방지)
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // --- 드롭다운 UI 로직 ---
  // 드롭다운 외부 클릭 감지 (드롭다운 닫기)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // inputWrapperRef나 optionsListRef 영역 내에서 발생한 클릭이 아니면 외부 클릭으로 간주
      if (
        inputWrapperRef.current &&
        !inputWrapperRef.current.contains(event.target as Node) &&
        optionsListRef.current &&
        !optionsListRef.current.contains(event.target as Node)
      ) {
        // 사용자가 검색어를 입력했지만 옵션을 선택하지 않고 외부를 클릭한 경우
        // 또는 선택된 값이 있었는데 input을 수정하고 외부를 클릭한 경우 (이 경우 inputValue가 selectedValue.label과 다름)
        if (selectedValue === null && inputValue.trim()) {
          onChange?.(null);
          setInputValue(''); // inputValue 비우기
        } else if (selectedValue !== null) {
          // 선택된 값이 있는 상태에서 외부 클릭 시, input 값을 선택된 값의 label로 되돌림
          // (사용자가 input을 수정했다가 선택 안 한 경우)
          const currentOptionLabel = options.find(opt => opt.value === selectedValue)?.label;
          if (currentOptionLabel && inputValue !== currentOptionLabel) {
            setInputValue(currentOptionLabel);
          }
        }
        setIsOptionsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputValue, selectedValue, options, onChange]);

  // 드롭다운 위치 업데이트 (스크롤, 리사이즈, 열림/닫힘 시)
  useEffect(() => {
    if (!inputWrapperRef.current) return;

    const updatePosition = () => {
      if (inputWrapperRef.current) {
        setDropdownRect(inputWrapperRef.current.getBoundingClientRect());
      }
    };

    if (isOptionsOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
    } else {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    }

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOptionsOpen]);

  // --- 옵션 선택 핸들러 ---
  const handleSelectOption = useCallback(
    (option: SearchInputOption<T>) => {
      isSelectingAnOption.current = true; // 옵션 선택으로 인한 inputValue 변경임을 표시
      setInputValue(option.label); // input에 선택된 label 반영
      setSelectedValue(option.value); // 선택된 값 저장
      setIsOptionsOpen(false); // 드롭다운 닫기
      setHighlightedIndex(-1); // 하이라이트 초기화
      onChange?.(option.value); // 부모에게 최종 선택된 값 전달
      inputRef.current?.focus(); // 옵션 선택 후 다시 input에 포커스
    },
    [onChange]
  );

  // --- Clear 버튼 클릭 핸들러 ---
  const handleClearInput = useCallback(() => {
    setInputValue(''); // input 값 비우기
    setSelectedValue(null); // 선택된 값 초기화
    setOptions([]); // 옵션 목록 초기화 (새로운 검색 준비)
    setIsOptionsOpen(false); // 드롭다운 닫기
    setHighlightedIndex(-1); // 하이라이트 초기화
    onChange?.(null); // 부모 컴포넌트에 null 값 전달하여 선택된 값 없음 알림
    inputRef.current?.focus(); // Clear 후 input에 포커스 (바로 새 입력 가능)
  }, [onChange]);

  // --- 키보드 탐색 로직 ---
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // selectedValue가 있을 때 (isInputReallyReadOnly가 true일 때)는 Enter, Escape, 방향키만 허용
      if (selectedValue !== null && !['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
        e.preventDefault(); // 다른 키 입력 무시
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        // 옵션이 없는데 inputValue가 있다면 검색을 수행하여 옵션 목록을 열도록 시도
        if (options.length === 0 && inputValue.trim()) {
          searchOptions(inputValue);
          return;
        }
        setIsOptionsOpen(true);
        setHighlightedIndex(prev => Math.min(prev + 1, options.length - 1));
        const nextIndex = Math.min(highlightedIndex + 1, options.length - 1);
        optionsListRef.current?.children[nextIndex]?.scrollIntoView({
          block: 'nearest',
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setIsOptionsOpen(true);
        setHighlightedIndex(prev => Math.max(prev - 1, 0));
        const prevIndex = Math.max(highlightedIndex - 1, 0);
        optionsListRef.current?.children[prevIndex]?.scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        if (highlightedIndex !== -1 && isOptionsOpen && options[highlightedIndex]) {
          e.preventDefault();
          handleSelectOption(options[highlightedIndex]);
        } else if (inputValue.trim() && !isOptionsOpen) {
          // input에 값이 있는데 드롭다운이 닫혀있으면 Enter 시 검색 수행
          searchOptions(inputValue);
        }
      } else if (e.key === 'Escape') {
        setIsOptionsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
      }
    },
    [options, highlightedIndex, isOptionsOpen, handleSelectOption, inputValue, searchOptions, selectedValue]
  );

  // 인풋 포커스 핸들러
  const handleInputFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsInputFocused(true);
      // 이미 선택된 값이 있다면 (isInputReallyReadOnly가 true), input에 포커스만 하고 추가 검색 로직은 수행하지 않습니다.
      // Clear 버튼을 눌러야만 검색 모드로 전환됩니다.
      if (selectedValue !== null) {
        // 이미 선택된 값의 label로 inputValue가 설정되어 있으므로,
        // 드롭다운만 다시 열어주어 사용자가 선택된 옵션을 다시 볼 수 있게 합니다.
        setIsOptionsOpen(true);
      }
      // 선택된 값이 없고, inputValue가 있다면 (이전에 검색 중이었거나 Clear 후 재포커스)
      else if (inputValue.trim()) {
        searchOptions(inputValue);
      }
      // 선택된 값도 없고 inputValue도 없지만, 이전에 검색된 옵션이 있었다면 다시 열어줌
      // (예: Clear 후 다시 포커스 시 이전 옵션들을 보여주고 싶을 때)
      else if (options.length > 0) {
        setIsOptionsOpen(true);
      }
      onFocus?.(e);
    },
    [onFocus, inputValue, selectedValue, options.length, searchOptions, options]
  );

  // 인풋 블러 핸들러
  const handleInputBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsInputFocused(false);
      // setTimeout을 사용하여 ClearButton 클릭 같은 다른 이벤트가 먼저 처리되도록 합니다.
      setTimeout(() => {
        setIsOptionsOpen(false);
        setHighlightedIndex(-1);

        // 선택된 값이 없는 상태에서 input에 값이 남아있다면 (사용자가 검색어를 입력했지만 선택 안 한 경우)
        // input 값을 비우고 onChange(null) 호출
        if (selectedValue === null && inputValue.trim()) {
          onChange?.(null);
          setInputValue('');
        }
        // 선택된 값이 있는 상태에서 input 값이 선택된 옵션의 label과 다르다면 (사용자가 input을 수정했다가 선택 안 한 경우)
        // input 값을 원래 선택된 옵션의 label로 되돌림
        else if (selectedValue !== null) {
          const currentOptionLabel = options.find(opt => opt.value === selectedValue)?.label;
          if (currentOptionLabel && inputValue !== currentOptionLabel) {
            setInputValue(currentOptionLabel);
          }
        }
      }, 100);
      onBlur?.(e);
    },
    [onBlur, inputValue, selectedValue, options, onChange]
  );

  const portalRoot = document.body;

  // **핵심 변경:** Clear 버튼은 오직 selectedValue가 있을 때만 표시됩니다.
  const showClearButton = selectedValue !== null;

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
        ref={inputWrapperRef}
        $isFocused={isInputFocused}
        $hasIcon={!!icon}
        $isDisabled={disabled}
        $isReadOnly={isInputReallyReadOnly} // InputWrapper에도 실제 readOnly 상태 전달
        $isError={isError}
        $isOptionsOpen={isOptionsOpen && !isInputReallyReadOnly} // readOnly일 때는 옵션이 열리지 않도록
      >
        {icon && <IconContainer>{icon}</IconContainer>}
        <StyledInput
          id={id}
          ref={inputRef}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={isInputReallyReadOnly} // Input 요소 자체의 readOnly 속성 적용
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-controls={isOptionsOpen && !isInputReallyReadOnly ? `${id}-options-list` : undefined}
          aria-expanded={isOptionsOpen && !isInputReallyReadOnly}
          aria-activedescendant={highlightedIndex !== -1 ? `${id}-option-${highlightedIndex}` : undefined}
          {...props}
        />
        {showClearButton && (
          <ClearButton type="button" onClick={handleClearInput} $hasLeadingIcon={!!icon}>
            <IconClose /> {/* fill='white' 제거. 기본 색상 혹은 CSS에서 color로 제어 */}
          </ClearButton>
        )}
      </InputWrapper>
      {isError && (
        <Text type="error" style={{ marginLeft: '4px' }}>
          {errorText}
        </Text>
      )}

      {/* readOnly 상태일 때는 옵션 목록을 렌더링하지 않음 */}
      {isOptionsOpen &&
        !isInputReallyReadOnly &&
        dropdownRect &&
        createPortal(
          <OptionsList
            ref={optionsListRef}
            id={`${id}-options-list`}
            role="listbox"
            style={{
              position: 'absolute',
              top: dropdownRect.bottom + window.scrollY, // InputWrapper 바로 아래에 오도록
              left: dropdownRect.left + window.scrollX,
              width: dropdownRect.width,
              zIndex: 1000,
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            {isLoading && <OptionItem $isDisabled={true}>검색 중...</OptionItem>}
            {!isLoading && options.length === 0 && inputValue.trim() && (
              <OptionItem $isDisabled={true}>검색 결과 없음</OptionItem>
            )}
            {!isLoading && options.length === 0 && !inputValue.trim() && (
              <OptionItem $isDisabled={true}>검색어를 입력하세요</OptionItem>
            )}
            {!isLoading &&
              options.map((option, index) => (
                <OptionItem
                  key={option.value}
                  id={`${id}-option-${index}`}
                  onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                    e.stopPropagation();
                    if (isLoading || options.length === 0) {
                      return;
                    }
                    handleSelectOption(option);
                  }}
                  role="option"
                  aria-selected={option.value === selectedValue || index === highlightedIndex}
                  $isHighlighted={index === highlightedIndex}
                >
                  {option.label}
                </OptionItem>
              ))}
          </OptionsList>,
          portalRoot
        )}
    </FieldContainer>
  );
};
