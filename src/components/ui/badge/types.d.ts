export type BadgeColorType = 'primary' | 'green' | 'orange' | 'purple' | 'grey' | (string & {});

/**
 * @interface BadgeStyles
 * @description Badge 스타일 컴포넌트의 props 타입을 정의합니다.
 */
export interface BadgeStyles {
  $badgeColor: BadgeColorType;
  $clickable?: boolean;
}

export interface BadgeProps extends BadgeStyles {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  clickable?: boolean;
}
