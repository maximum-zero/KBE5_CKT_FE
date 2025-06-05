import styled, { css } from 'styled-components';
import type { PanelAnimatedContentProps, PanelContainerProps } from './types';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
`;

export const PanelContainer = styled.div<PanelContainerProps>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  background-color: var(--color-white);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  width: ${({ $width }) => $width};
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: translateX(0);
    `}
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background-color: var(--color-white);
  z-index: 1; /* 스크롤 콘텐츠 위로 */

  h2 {
    margin: 0;
    padding: 0;
    color: var(--color-gray800);
    font-size: 18px;
    font-weight: 900;
    line-height: 21.6px;
    word-wrap: break-word;
  }
`;

export const HeaderActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const PanelContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 24px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

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
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
`;

export const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const PanelSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PanelRowSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PanelRowContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

// --- 3. 텍스트 및 라벨 스타일 ---
export const PanelTitle = styled.h2`
  display: block;
  margin: 0;
  padding: 0;
  color: var(--color-gray800);
  font-size: 18px;
  font-weight: 900;
  line-height: 21.6px;
  word-wrap: break-word;
`;

export const PanelSubTitle = styled.h2`
  display: block;
  margin: 0;
  padding: 0;
  color: var(--color-gray800);
  font-size: 16px;
  font-weight: 900;
  line-height: 19.2px;
  word-wrap: break-word;
`;

export const PanelLabelText = styled.span`
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.8px;
  word-wrap: break-word;
`;

export const PanelValueText = styled.span`
  color: #334155;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  word-wrap: break-word;
`;

// --- 4. 라벨 및 값(Input/Text) 컨테이너 스타일 ---
export const PanelLabelContainer = styled.div`
  width: 100px;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const PanelValueContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

// --- 5. 입력 필드 (Input/Textarea) 스타일 ---
export const StyledInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.5;
  box-sizing: border-box;
  min-height: 40px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }

  &[as='textarea'] {
    resize: vertical;
    min-height: 80px;
  }
`;

// --- 6. 애니메이션 컨테이너 스타일 ---
export const AnimatedContent = styled.div<PanelAnimatedContentProps>`
  max-height: ${({ $isVisible, $maxHeight }) => ($isVisible ? $maxHeight : '0')};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  overflow: hidden;
  transition:
    max-height ${({ $duration }) => $duration || '0.1s'} ease,
    opacity ${({ $duration }) => $duration || '0.1s'} ease;
  width: 100%;
  display: block;
`;

// --- 7. 임시/플레이스홀더 컴포넌트 스타일 ---
export const MapContainer = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  background: var(--color-gray300, #e2e8f0);
  justify-content: center;
  align-items: center;
  color: #64748b;
  font-size: 16px;
  border-radius: 8px;
`;

export const TextAreaPlaceholder = styled.div`
  padding: 8px 12px;
  border: 1px dashed #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  color: #64748b;
  min-height: 80px;
  width: 100%;
  box-sizing: border-box;
  white-space: pre-wrap;
`;
