import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 24px;
`;

export const ContentContainer = styled.div`
  padding: 12px 24px;
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  gap: 12px;
`;

export const TitleWrap = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const ContentWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 16px;
`;

export const FilterWrap = styled.div`
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: var(--color-white);
  border-radius: 12px;
`;

export const VehicleList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > *:last-child {
    margin-bottom: 8px;
  }

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

export const MapWrap = styled.div`
  flex: 1;
  background-color: var(--color-white);
  border-radius: 8px;
`;
