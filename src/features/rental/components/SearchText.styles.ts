import styled from 'styled-components';

export const SearchContainer = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TitleContainer = styled.div`
  padding: 12.5px 16px;
  background-color: var(--color-gray200);

  font-size: 12px;
  font-weight: 500;
  line-height: 14.4px;
  color: var(--color-gray600);

  border: 1px var(--color-gray200) solid;
`;

export const ContentContainer = styled.div`
  max-height: 160px;
  overflow-y: auto;
  background-color: var(--color-gray200);

  font-size: 14px;
  font-weight: 500;
  line-height: 16.8px;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  border: 1px var(--color-gray300) solid;

  & > *:not(:last-child) {
    border-bottom: 1px var(--color-gray300) solid;
  }
`;

export const NoContentContainer = styled.div`
  padding: 12.5px 16px;
  height: 158px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 12px;
  font-weight: 500;
  line-height: 14.4px;
  color: var(--color-gray600);
`;

export const ErrorContainer = styled.div`
  padding: 12.5px 16px;
  height: 158px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 12px;
  font-weight: 500;
  line-height: 14.4px;
  color: var(--color-red);
`;
