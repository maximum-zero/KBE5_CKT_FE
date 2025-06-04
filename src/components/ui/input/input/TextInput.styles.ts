import styled, { css } from 'styled-components';
import type { FieldContainerProps, InputWrapperProps } from './types';

export const FieldContainer = styled.div<FieldContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-width: ${({ $width }) => $width || '200px'};
`;

export const StyledLabel = styled.label`
  color: var(--color-gray700);
  font-size: 14px;
  font-weight: 500;
  line-height: 16.8px;
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
  outline: 1px solid var(--color-gray400);
  outline-offset: -1px;
  transition:
    outline-color 0.2s ease,
    outline 0.2s ease;
  cursor: text;

  ${({ $isFocused }) =>
    $isFocused &&
    css`
      outline: 1px solid var(--color-primary);
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
        outline: 1px solid var(--color-gray400); /* disabled 시 포커스 아웃라인 고정 */
      }
      ${IconContainer} {
        cursor: not-allowed;
      }
    `}

  ${({ $isReadOnly }) =>
    $isReadOnly &&
    css`
      /* readOnly 시 background는 white 유지, 커서만 not-allowed */
      background: var(--color-white); /* 읽기 전용은 배경을 회색으로 바꾸지 않음 */
      cursor: not-allowed;
      ${StyledInput} {
        color: var(--color-gray900); /* 읽기 전용은 글자색 유지 */
        cursor: not-allowed;
      }
      &:focus-within {
        outline: 1px solid var(--color-gray400); /* readOnly 시 포커스 아웃라인 고정 */
      }
      ${IconContainer} {
        cursor: not-allowed;
      }
    `}

  /* disabled와 readOnly 상태일 때 outline-color 변경 방지 */
  ${({ $isDisabled, $isReadOnly }) =>
    ($isDisabled || $isReadOnly) &&
    css`
      /* 둘 중 하나라도 true면 outline 컬러 변경 방지 */
      ${StyledInput} {
        pointer-events: none; /* 클릭 이벤트 방지 (커서만 변경하는 것 이상으로 상호작용 차단) */
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

  &::placeholder {
    color: var(--color-gray600);
  }

  &:disabled,
  &:read-only {
    cursor: not-allowed;
  }
`;
