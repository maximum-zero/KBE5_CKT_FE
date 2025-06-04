export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageBlockSize?: number;
}

export interface PageButtonStylesProps {
  $isActive?: boolean;
  $isNavigation?: boolean;
}

export interface PageNumberTextStylesProps {
  $isActive?: boolean;
}

export interface StyledVectorStylesProps {
  $isFlipped?: boolean;
}
