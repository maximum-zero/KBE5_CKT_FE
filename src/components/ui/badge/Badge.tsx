import React from 'react';
import { StyledBadge, StyledBadgeTextSpan } from './Badge.styles';
import type { BadgeProps } from './types';

export const Badge: React.FC<BadgeProps> = ({ $badgeColor, children }) => {
  return (
    <StyledBadge $badgeColor={$badgeColor}>
      <StyledBadgeTextSpan>{children}</StyledBadgeTextSpan>
    </StyledBadge>
  );
};
