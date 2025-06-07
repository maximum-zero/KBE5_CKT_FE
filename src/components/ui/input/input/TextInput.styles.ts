import styled, { css } from 'styled-components';
import type { FieldContainerProps, InputWrapperProps } from './types';

export const FieldContainer = styled.div<FieldContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  min-width: ${({ $width }) => $width || '200px'};
`;

export const StyledLabel = styled.label`
  /* 기존 스타일은 Text 컴포넌트의 type="label"에 의해 적용됩니다. */
  /* 여기서는 단순히 htmlFor 연결을 위한 label 태그 역할만 합니다. */
  user-select: none;
`;

export const InputWrapper = styled.div<InputWrapperProps>`
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

  ${({ $isFocused }) =>
    $isFocused &&
    css`
      outline: 1px var(--color-primary) solid;
      outline-offset: -1px;
    `}

  ${({ $isError }) =>
    $isError &&
    css`
      outline: 1px var(--color-red) solid; /* 에러 시 빨간 테두리 */
      outline-offset: -1px;
    `}

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      background: var(--color-gray200);
      cursor: not-allowed;
      ${StyledInput} {
        color: var(--color-gray600);
        cursor: not-allowed;
      }
      &::placeholder {
        color: var(--color-gray600);
      }
      &:focus-within {
        outline: 1px var(--color-gray400) solid; /* disabled 시 포커스 아웃라인 고정 */
      }
      ${IconContainer} {
        cursor: not-allowed;
      }
    `}

  ${({ $isReadOnly }) =>
    $isReadOnly &&
    css`
      background: var(--color-white);
      cursor: not-allowed;
      ${StyledInput} {
        color: var(--color-gray900);
        cursor: not-allowed;
      }
      &:focus-within {
        outline: 1px var(--color-gray400) solid; /* readOnly 시 포커스 아웃라인 고정 */
      }
      ${IconContainer} {
        cursor: not-allowed;
      }
    `}

  ${({ $hasIcon }) =>
    $hasIcon &&
    css`
      ${StyledInput} {
        padding-right: 8px;
      }
    `}
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--color-gray600);
  cursor: pointer;
`;

export const StyledInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  line-height: 16.8px;
  color: var(--color-gray900);
  box-sizing: border-box; /* 추가: padding/border가 width에 포함되도록 */

  &::placeholder {
    color: var(--color-gray600);
  }

  &:disabled,
  &:read-only {
    cursor: not-allowed;
  }
`;
