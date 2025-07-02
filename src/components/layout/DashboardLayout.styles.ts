import styled from 'styled-components';

export const DashboardContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TitleContainer = styled.section`
  padding: 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-gray300);
`;

export const FilterContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-bottom: 1px solid var(--color-gray300);
  padding: 16px 24px;
`;

export const FilterTitle = styled.div`
  font-size: 16px;
  font-weight: 900;
  color: var(--color-gray800);
`;

export const FilterWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const FilterContent = styled.div`
  width: calc(100% - 100px);
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const TableContainer = styled.section`
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TableTitle = styled.div`
  font-size: 16px;
  font-weight: 900;
  color: var(--color-gray800);
`;
