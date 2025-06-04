export type CellType = 'badge' | 'action' | (string & {});
export type AlignType = 'left' | 'center' | 'right';
export type BadgeColorType = 'primary' | 'green' | 'orange' | 'purple' | 'grey' | (string & {});

/**
 * @interface TableHeader
 * @description 테이블 헤더의 각 컬럼에 대한 정보를 정의합니다.
 * @template T - 이 헤더가 적용될 데이터 객체의 타입
 */
export interface TableHeader<T extends object> {
  label: string;
  key: keyof T | (string & {});
  width: string | 'auto' | 'flex';
  minWidth?: string;
  preventWrap?: boolean;
  type?: CellType;
  displayKey?: keyof T | (string & {});
  valueToBadgeColorMap?: {
    [value: string | number | boolean]: BadgeColorType;
  };

  align?: AlignType;
}

/**
 * @interface TableRowProps
 * @description TableRow 컴포넌트의 props 타입을 정의합니다.
 * @template T - 각 행의 데이터 객체에 대한 제네릭 타입
 */
export interface TableRowProps<T extends object> {
  data: T;
  tableHeaders: TableHeader<T>[];
  isLastRow: boolean;
  onRowClick?: (rowData: T) => void;
}

/**
 * @interface TableProps
 * @description Table 컴포넌트의 props 타입을 정의합니다.
 * @template T - 각 행의 데이터 객체에 대한 제네릭 타입 (id 필드를 포함해야 함)
 */
export interface TableProps<T extends object & { id: string | number }> {
  tableHeaders: TableHeader<T>[];
  data: T[];
  emptyMessage?: string;
  onRowClick?: (rowData: T) => void;
}

/**
 * @interface TableCellBaseStyles
 * @description 공통 셀 스타일 컴포넌트의 props 타입을 정의합니다.
 */
export interface TableCellBaseStyles {
  $flexGrow: number;
  $flexShrink: number;
  $flexBasis: string | 'auto';
  $minWidth?: string;
  $isLastCell?: boolean; // 마지막 셀인지 여부
  $isLastRow?: boolean; // 마지막 행인지 여부
}

/**
 * @interface TableDataCellStyles
 * @description TableDataCell 스타일 컴포넌트의 props 타입을 정의합니다.
 */
export interface TableDataCellStyles extends TableCellBaseStyles {
  $align?: AlignType; // ✨ 타입 변경: 미리 정의된 AlignType 사용 ✨
}

/**
 * @interface DataSpanStyles
 * @description DataSpan 스타일 컴포넌트의 props 타입을 정의합니다.
 */
export interface DataSpanStyles {
  $preventWrap?: boolean;
}

/**
 * @interface BadgeStyles
 * @description Badge 스타일 컴포넌트의 props 타입을 정의합니다.
 */
export interface BadgeStyles {
  $badgeColor: BadgeColorType;
}
