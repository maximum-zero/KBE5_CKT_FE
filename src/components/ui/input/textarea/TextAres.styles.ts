import styled, { css } from 'styled-components';
import type { FieldContainerProps, InputWrapperProps } from './types';

// FieldContainer는 TextInput과 동일한 역할을 합니다.
export const FieldContainer = styled.div<FieldContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-width: ${({ $width }) => $width || '200px'};
  ${({ $minHeight }) => $minHeight && `min-height: ${$minHeight};`}
  ${({ $maxHeight }) => $maxHeight && `max-height: ${$maxHeight};`}
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
  /* align-items: center; /* textarea는 세로 정렬이 중요하지 않음 */
  align-self: stretch; /* 부모(FieldContainer)의 너비를 꽉 채우도록 */
  width: 100%;
  /* height: 40px; /* textarea는 고정 높이 대신 내용에 따라 유동적으로 변해야 함 */
  padding: 8px 12px; /* textarea의 특성에 맞게 패딩 조절 */
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
      ${StyledTextArea} {
        /* StyledInput 대신 StyledTextArea 참조 */
        color: var(--color-gray600);
        cursor: not-allowed;
      }
      &::placeholder {
        color: var(--color-gray600);
      }
      &:focus-within {
        outline: 1px solid var(--color-gray400); /* disabled 시 포커스 아웃라인 고정 */
      }
    `}

  ${({ $isReadOnly }) =>
    $isReadOnly &&
    css`
      background: var(--color-white);
      cursor: not-allowed;
      ${StyledTextArea} {
        /* StyledInput 대신 StyledTextArea 참조 */
        color: var(--color-gray900);
        cursor: not-allowed;
      }
      &:focus-within {
        outline: 1px solid var(--color-gray400); /* readOnly 시 포커스 아웃라인 고정 */
      }
    `}

  ${({ $isDisabled, $isReadOnly }) =>
    ($isDisabled || $isReadOnly) &&
    css`
      ${StyledTextArea} {
        /* StyledInput 대신 StyledTextArea 참조 */
        pointer-events: none; /* 클릭 이벤트 방지 */
      }
    `}
`;

// TextInput의 StyledInput 대신 textarea 요소를 위한 StyledTextArea
export const StyledTextArea = styled.textarea`
  flex: 1; /* InputWrapper 내에서 사용 가능한 공간을 채우도록 */
  width: 100%; /* 부모 InputWrapper의 100% 너비 차지 */
  height: auto; /* 내용에 따라 높이 조절 */
  min-height: 64px; /* 최소 높이 설정 (InputWrapper의 padding을 고려) */
  resize: none;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  line-height: 1.5; /* 줄 간격 조절 */
  color: var(--color-gray900);
  box-sizing: border-box; /* padding과 border가 width/height에 포함되도록 */

  &::placeholder {
    color: var(--color-gray600);
  }

  &:disabled,
  &:read-only {
    cursor: not-allowed;
  }
`;
