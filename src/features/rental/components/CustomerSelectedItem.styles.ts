import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 16px;

  background-color: var(--color-primaryLight);
  border: 1px var(--color-primary) solid;
  border-radius: 8px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  color: var(--color-gray600);
`;

export const Content = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 19.2px;
  color: var(--color-gray900);
`;
