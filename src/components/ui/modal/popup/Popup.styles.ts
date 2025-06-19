import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContainer = styled(motion.div)`
  width: 600px;
  max-height: calc(100vh - 64px);
  padding: 24px 0;
  background: var(--color-white);
  border-radius: 8px;
  outline: 1px solid var(--color-gray600);
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Header = styled.div`
  display: flex;
  padding: 0 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  padding: 0 24px;
  flex-direction: column;
  gap: 20px;

  overflow-y: auto;

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

export const ActionButtonsWrapper = styled.div`
  align-self: stretch;
  display: flex;
  padding: 0 24px;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;
