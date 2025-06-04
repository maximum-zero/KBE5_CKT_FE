import styled, { css } from 'styled-components';
import type { TableCellBaseStyles, TableDataCellStyles, DataSpanStyles } from './types';

const BaseSpan = styled.span`
  /* 기본 스타일: 필요시 추가 */
`;

export const TableHeaderSpan = styled(BaseSpan)`
  color: var(--color-gray700);
  font-size: 14px;
  font-weight: 900;
  line-height: 16.8px;
`;

export const DataSpan = styled(BaseSpan)<DataSpanStyles>`
  color: var(--color-gray900);
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  word-break: break-word;

  ${({ $preventWrap }) =>
    $preventWrap &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;

export const StyledTableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  border: 1px var(--color-gray300) solid;
  background: var(--color-white);
`;

export const StyledTableInnerContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: fit-content;
`;

export const StyledTableTableHeader = styled.div`
  min-height: 48px;
  background: var(--color-primaryLight);
  display: flex;
  align-items: stretch;
  border-bottom: 1px var(--color-gray300) solid;
`;

export const StyledTableRow = styled.div<{ $isLastRow?: boolean; $isClickable?: boolean }>`
  min-height: 48px;
  display: flex;
  align-items: stretch;
  background: var(--color-white);

  &:hover {
    background: var(--color-gray200);
    ${({ $isClickable }) =>
      $isClickable &&
      css`
        cursor: pointer; // ✨ 클릭 가능할 때만 포인터 커서 ✨
      `}
  }

  /* 마지막 행의 하단 보더는 EmptyTableMessageRow에서 처리하므로 여기서는 제거 */
  ${({ $isLastRow }) =>
    $isLastRow &&
    css`
      /* 마지막 행의 하단 보더를 직접 StyledTableRow에서 제거하지 않습니다.
         이 보더는 TableCellBase에서 그려지고 마지막 셀의 하단 보더만 제거하면 됩니다.
         전체 행의 하단 보더가 필요하다면 여기에 추가할 수 있으나, 현재 셀 단위로 처리.
      */
    `}
`;

const TableCellBase = styled.div<TableCellBaseStyles>`
  display: flex;
  flex-direction: column;
  padding: 8px 12px;

  flex-grow: ${({ $flexGrow }) => $flexGrow};
  flex-shrink: ${({ $flexShrink }) => $flexShrink};
  flex-basis: ${({ $flexBasis }) => $flexBasis};

  ${({ $minWidth }) => $minWidth && `min-width: ${$minWidth};`}

  border-right: 1px var(--color-gray300) solid;
  border-bottom: 1px var(--color-gray300) solid;

  /* 마지막 셀에만 오른쪽 보더 제거 */
  ${({ $isLastCell }) =>
    $isLastCell &&
    css`
      border-right: none;
    `}

  ${({ $isLastRow }) =>
    $isLastRow &&
    css`
      border-bottom: none;
    `}
`;

export const TableHeaderCell = styled(TableCellBase)`
  justify-content: center;
  align-items: center;
  text-align: center;
  border-bottom: none;
`;

export const TableDataCell = styled(TableCellBase)<TableDataCellStyles>`
  background: none;

  ${({ $align }) => {
    switch ($align) {
      case 'left':
        return css`
          justify-content: flex-start;
          align-items: flex-start;
          text-align: left;
        `;
      case 'right':
        return css`
          justify-content: center;
          align-items: flex-end;
          text-align: right;
        `;
      case 'center':
      default:
        return css`
          justify-content: center;
          align-items: center;
          text-align: center;
        `;
    }
  }}
`;

export const EmptyTableMessageRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 320px;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-gray900);
  background: var(--color-white);
  border-bottom: none;
`;
