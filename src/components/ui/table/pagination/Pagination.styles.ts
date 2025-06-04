import styled, { css } from 'styled-components';
import type { PageButtonStylesProps, PageNumberTextStylesProps, StyledVectorStylesProps } from './types';

export const StyledPagination = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: stretch;
`;

export const PageButton = styled.button<PageButtonStylesProps>`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  padding: 0;
  transition:
    background-color 0.2s ease,
    outline 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${({ $isNavigation }) =>
    $isNavigation &&
    css`
      background: var(--color-white);
      outline: 1px var(--color-border) solid;
      outline-offset: -1px;
      &:hover:not(:disabled) {
        background: var(--color-primaryLight);
      }
    `}

  ${({ $isActive, $isNavigation }) =>
    !$isNavigation &&
    css`
      background: ${$isActive ? 'var(--color-primary)' : 'var(--color-white)'};
      outline: ${$isActive ? 'none' : '1px var(--color-gray300) solid'};
      outline-offset: ${$isActive ? '0' : '-1px'};

      &:hover:not(:disabled) {
        background: ${$isActive ? 'var(--color-primary)' : 'var(--color-primaryLight)'};
      }
    `}
`;

export const PageNumberText = styled.span<PageNumberTextStylesProps>`
  font-size: 14px;
  font-weight: 500;
  line-height: 16.8px;
  word-wrap: break-word;
  color: ${props => (props.$isActive ? 'white' : 'var(--color-gray600)')};

  user-select: none;
`;

export const StyledArrowFrame = styled.div`
  width: 16px;
  height: 16px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledVector = styled.div<StyledVectorStylesProps>`
  width: 6px;
  height: 6px;
  border-top: 2px solid var(--color-gray600);
  border-right: 2px solid var(--color-gray600);

  transform: rotate(${({ $isFlipped }) => ($isFlipped ? '225deg' : '45deg')});
  transform-origin: center;
  transition: border-color 0.2s ease;
`;
