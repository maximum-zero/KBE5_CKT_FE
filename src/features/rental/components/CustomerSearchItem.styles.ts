import styled from 'styled-components';

export const Container = styled.div`
  padding: 8.5px 16px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;

  cursor: pointer;

  &:hover {
    background-color: var(--color-primaryLight);
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 8px;

  font-size: 14px;
  font-weight: 500;
  line-height: 16.8px;
  color: var(--color-gray800);
`;

export const ContentContainer = styled.div`
  display: flex;

  font-size: 12px;
  line-height: 1.2;
  color: var(--color-gray600);
`;
