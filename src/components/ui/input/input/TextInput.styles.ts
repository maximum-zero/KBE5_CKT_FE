import styled, { css } from 'styled-components';
import type { InputWrapperProps } from './types';

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
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
  height: 40px;
  padding: 0 12px;
  background: var(--color-white);
  border-radius: 6px;
  outline: 1px solid var(--color-gray400);
  outline-offset: -1px;
  transition:
    outline-color 0.2s ease,
    outline 0.2s ease;

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
        outline: 1px solid var(--color-gray400);
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

  &:disabled {
    cursor: not-allowed;
  }
`;
