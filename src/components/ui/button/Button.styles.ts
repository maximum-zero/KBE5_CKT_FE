import styled from 'styled-components';
import type { StyledBasicButtonProps, StyledIconButtonProps } from './types';

// --- 공통 버튼 스타일 ---
export const CommonButtonStyles = `
  word-wrap: break-word;
  border-radius: 6px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.8px;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.1s ease;
  user-select: none;

  &:active {
    transform: scale(0.98);
  }
`;

// --- 기본 버튼 Styled Component ---
export const StyledBasicButton = styled.button<StyledBasicButtonProps>`
  ${CommonButtonStyles}

  /* 버튼 타입에 따른 컬러 스타일 */
  ${props => {
    switch (props.$buttonType) {
      case 'primary':
        return `
          background: var(--color-primary);
          color: var(--color-white);
          &:hover {
            background: var(--color-primaryDark);
          }
        `;
      case 'basic':
        return `
          background: var(--color-gray400);
          color: var(--color-gray600);
          &:hover {
            background: var(--color-gray500);
          }
        `;
      case 'info':
        return `
          background: var(--color-redLight);
          color: var(--color-red);
          &:hover {
            background: var(--color-redLightDark);
          }
        `;
      default:
        return `
          background: var(--color-primary);
          color: var(--color-white);
          &:hover {
            background: var(--color-primaryDark);
          }
        `;
    }
  }}
`;

// --- 아이콘 버튼 Styled Component ---
export const StyledIconButton = styled.button<StyledIconButtonProps>`
  ${CommonButtonStyles}
  background: var(--color-primary);
  color: var(--color-white);

  &:hover {
    background: var(--color-primaryDark);
  }

  gap: 8px;

  ${props =>
    props.$iconPosition === 'right' &&
    `
    flex-direction: row-reverse;
  `}

  // ICON 중앙 정렬
  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // ICON 기본 크기 유지
  span:first-child {
    flex-shrink: 0;
    flex-basis: auto;
  }
`;
