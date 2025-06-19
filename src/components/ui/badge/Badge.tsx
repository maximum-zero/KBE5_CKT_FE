import React from 'react';
import { StyledBadge, StyledBadgeTextSpan } from './Badge.styles';
import type { BadgeProps } from './types';

export const Badge: React.FC<BadgeProps> = ({ $badgeColor, children, onClick, clickable }) => {
  return (
    <StyledBadge $badgeColor={$badgeColor} onClick={onClick} $clickable={clickable}>
      <StyledBadgeTextSpan>{children}</StyledBadgeTextSpan>
    </StyledBadge>
  );
};
