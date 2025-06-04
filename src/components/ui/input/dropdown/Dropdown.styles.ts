import styled, { css } from 'styled-components';
import type { FieldContainerProps, StyledDropdownContainerProps, DropdownIconProps } from './types';

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

export const SelectedValueText = styled.span`
  color: var(--color-gray900);
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  word-wrap: break-word;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  user-select: none;
`;

export const DropdownIcon = styled.div<DropdownIconProps>`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease-in-out;
`;

export const StyledDropdownContainer = styled.div<StyledDropdownContainerProps>`
  min-width: ${({ $width }) => $width || '200px'};
  height: 40px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  background: var(--color-white);
  outline: 1px var(--color-gray400) solid;
  outline-offset: -1px;
  cursor: pointer;

  ${({ $isDisabledOrReadOnly }) =>
    $isDisabledOrReadOnly &&
    css`
      background: var(--color-gray200);
      color: var(--color-gray600);
      cursor: not-allowed;
      ${SelectedValueText} {
        color: var(--color-gray600);
      }
      ${DropdownIcon} {
        cursor: not-allowed;
      }
      &:focus-within,
      &:hover {
        outline: 1px var(--color-gray400) solid;
      }
    `}

  ${({ $isOpen, $isDisabledOrReadOnly }) =>
    !$isDisabledOrReadOnly &&
    ($isOpen
      ? css`
          outline: 1px var(--color-primary) solid;
          outline-offset: -1px;
        `
      : css`
          &:focus-within {
            outline: 1px var(--color-primary) solid;
            outline-offset: -1px;
          }
        `)}
`;

export const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  background: var(--color-white);
  border: 1px var(--color-gray400) solid;
  border-radius: 6px;
  margin-top: 4px;
  padding: 0;
  list-style: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;

  user-select: none;

  /* WebKit (Chrome, Safari) */
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
  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
`;

export const OptionItem = styled.li`
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  color: var(--color-gray900);
  cursor: pointer;

  &:hover {
    background: var(--color-primaryLight);
    color: var(--color-primaryDark);
  }

  &:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;
