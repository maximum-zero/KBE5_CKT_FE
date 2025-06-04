import React, { useMemo } from 'react';
import { StyledPagination, PageButton, PageNumberText, StyledArrowFrame, StyledVector } from './Pagination.styles';
import type { PaginationProps } from './types';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageBlockSize = 10,
}) => {
  const currentBlock = Math.ceil(currentPage / pageBlockSize);
  const totalBlocks = Math.ceil(totalPages / pageBlockSize);

  const startPage = (currentBlock - 1) * pageBlockSize + 1;
  const endPage = Math.min(startPage + pageBlockSize - 1, totalPages);

  const pages = useMemo(() => {
    const pageNumbers: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }, [startPage, endPage]);

  const goToPrevBlock = () => {
    if (currentBlock > 1) {
      onPageChange((currentBlock - 1) * pageBlockSize);
    }
  };

  const goToNextBlock = () => {
    if (currentBlock < totalBlocks) {
      onPageChange(currentBlock * pageBlockSize + 1);
    }
  };

  return (
    <StyledPagination>
      {currentBlock > 1 && totalPages > 0 && (
        <PageButton onClick={goToPrevBlock} $isNavigation>
          <StyledArrowFrame>
            <StyledVector $isFlipped={true} />
          </StyledArrowFrame>
        </PageButton>
      )}

      {pages.map(page => (
        <PageButton
          key={page}
          onClick={() => onPageChange(page)}
          $isActive={page === currentPage}
          disabled={totalPages === 0}
        >
          <PageNumberText $isActive={page === currentPage}>{page}</PageNumberText>
        </PageButton>
      ))}

      {currentBlock < totalBlocks && totalPages > 0 && (
        <PageButton onClick={goToNextBlock} $isNavigation>
          <StyledArrowFrame>
            <StyledVector />
          </StyledArrowFrame>
        </PageButton>
      )}
    </StyledPagination>
  );
};
