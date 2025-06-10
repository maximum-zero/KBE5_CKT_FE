import styled, { css } from 'styled-components';

// =========================================================
// 타입 정의
// =========================================================

// FieldContainerProps (TextInput, Dropdown 공통)
interface FieldContainerProps {
  $width?: string;
}

// InputWrapperProps (TextInput)
interface InputWrapperProps {
  $isFocused?: boolean;
  $hasIcon?: boolean;
  $isDisabled?: boolean;
  $isReadOnly?: boolean;
  $isError?: boolean;
  $isOptionsOpen?: boolean; // SearchInput 전용: 드롭다운 열림 상태
}

// OptionItemProps (Dropdown, SearchInput 공통)
interface OptionItemProps {
  $isHighlighted?: boolean; // 키보드 탐색 시 하이라이트
  $isDisabled?: boolean; // 옵션 항목 비활성화 (예: "검색 중...")
}

// ClearButtonProps (새로 추가)
interface ClearButtonProps {
  $hasLeadingIcon: boolean; // 앞에 아이콘이 있는지 여부
}

// =========================================================
// SearchInput 전용 스타일 정의
// =========================================================

export const FieldContainer = styled.div<FieldContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  min-width: ${({ $width }) => $width || '200px'};
`;

export const StyledLabel = styled.label`
  user-select: none;
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative; /* ClearButton의 absolute positioning을 위한 설정 */
  display: flex;
  align-items: center;
  align-self: stretch;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  background: var(--color-white);
  border-radius: 6px;
  outline: 1px var(--color-gray400) solid; /* 기본 테두리 색상 */
  outline-offset: -1px;
  transition:
    outline-color 0.2s ease,
    outline 0.2s ease;
  cursor: text;

  /*
    1. 에러 상태가 최우선
    2. 에러가 아닐 때, 포커스되거나 드롭다운이 열려있으면 primary 색상
    3. 비활성화 또는 읽기 전용 상태일 때는 항상 고정된 스타일 유지
  */
  ${({ $isDisabled, $isReadOnly, $isError, $isFocused, $isOptionsOpen }) =>
    $isDisabled || $isReadOnly
      ? // 비활성화 또는 읽기 전용 상태일 때
        css`
          background: var(--color-gray200);
          cursor: not-allowed;
          outline: 1px var(--color-gray400) solid; /* 이 상태에서는 항상 회색 테두리 */
          &:focus-within,
          &:hover {
            outline: 1px var(--color-gray400) solid; /* 포커스/호버 시에도 고정 */
          }
        `
      : // 활성화 상태일 때 (에러 / 포커스 / 드롭다운 열림)
        css`
          /* 에러 상태 스타일 (최우선 적용) */
          ${$isError &&
          css`
            outline: 1px var(--color-red) solid;
            outline-offset: -1px;
          `}
          /* 드롭다운이 열린 상태 또는 포커스 시 스타일 (에러 상태가 아닐 때) */
          ${($isFocused || $isOptionsOpen) &&
          !$isError &&
          css`
            outline: 1px var(--color-primary) solid;
            outline-offset: -1px;
          `}
        `}

  ${({ $hasIcon }) =>
    $hasIcon &&
    css`
      ${StyledInput} {
        padding-left: 40px; /* 아이콘이 있을 때 인풋의 왼쪽 패딩 조절 */
      }
    `}
`;

export const IconContainer = styled.div`
  position: absolute; /* InputWrapper 내에서 절대 위치 */
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--color-gray600);
  pointer-events: none; /* 아이콘 클릭 방지 */
`;

export const StyledInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  line-height: 16.8px;
  color: var(--color-gray900);
  box-sizing: border-box;
  padding: 0; /* 기본 padding 제거, InputWrapper에서 padding 조절 */
  height: 100%; /* InputWrapper의 높이 채우기 */
  padding-right: 28px; /* ClearButton을 위한 공간 확보 */

  &::placeholder {
    color: var(--color-gray600);
  }

  /* InputWrapper의 $isDisabled, $isReadOnly 속성에 따라 내부 input의 스타일 변경 */
  ${({ disabled }) =>
    disabled &&
    css`
      color: var(--color-gray600);
      cursor: not-allowed;
      &::placeholder {
        color: var(--color-gray600);
      }
    `}
  ${({ readOnly }) =>
    readOnly &&
    css`
      color: var(--color-gray900);
      cursor: default; /* readOnly 일 때는 not-allowed 보다는 default가 자연스럽습니다. */
    `}
`;

export const OptionsList = styled.ul`
  background: var(--color-white);
  border: 1px var(--color-gray400) solid;
  border-radius: 6px;
  padding: 0;
  list-style: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px; /* 스크롤 가능하도록 최대 높이 설정 */
  overflow-y: auto;
  user-select: none;
  z-index: 1000; /* 드롭다운이 다른 요소 위에 오도록 */

  /* 스크롤바 스타일링 (WebKit) */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4);
  }
  /* 스크롤바 스타일링 (Firefox) */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
`;

export const OptionItem = styled.li<OptionItemProps>`
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  color: var(--color-gray900);
  cursor: pointer;
  white-space: nowrap; /* 텍스트가 줄 바꿈되지 않도록 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 ... 표시 */

  /* 하이라이트 스타일 */
  background-color: ${({ $isHighlighted }) => ($isHighlighted ? 'var(--color-primaryLight)' : 'white')};
  color: ${({ $isHighlighted }) => ($isHighlighted ? 'var(--color-primaryDark)' : 'var(--color-gray900)')};

  &:hover {
    background: var(--color-primaryLight);
    color: var(--color-primaryDark);
  }

  /* 비활성화 상태 스타일 */
  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      cursor: default;
      background-color: var(--color-white); /* disabled 상태에서는 배경색 고정 */
      color: var(--color-gray600); /* disabled 텍스트 색상 */
      &:hover {
        background-color: var(--color-white); /* hover 효과 제거 */
        color: var(--color-gray600); /* hover 시에도 텍스트 색상 고정 */
      }
    `}

  &:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

// --- Clear Button 스타일 추가 ---
export const ClearButton = styled.button<ClearButtonProps>`
  position: absolute;
  right: 12px; /* InputWrapper의 오른쪽 패딩에 맞게 조절 */
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray600);
  font-size: 16px; /* 아이콘 크기 조절 */
  z-index: 2; /* Input 위에 표시되도록 충분히 높은 z-index 설정 */
  width: 20px; /* 아이콘이 차지할 공간 */
  height: 20px;

  &:hover {
    color: var(--color-gray800);
  }

  /* leading icon이 있는 경우 ClearButton의 위치를 조정 */
  ${({ $hasLeadingIcon }) =>
    $hasLeadingIcon &&
    css`
      right: 12px; /* 아이콘이 있을 때 ClearButton의 위치 유지 (오른쪽 패딩 이미 포함) */
      /* 만약 아이콘이 왼쪽에 있다면, input의 padding-right와 clear button의 위치 조절이 필요 */
      /* 여기서는 input의 padding-right를 28px로 설정했으므로, 아이콘 유무에 상관없이 right: 12px 유지 */
    `}
`;
