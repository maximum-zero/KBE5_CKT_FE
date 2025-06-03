import React from 'react';

import { StyledIconButton } from './Button.styles';
import type { IconButtonProps } from './types';

export const IconButton: React.FC<IconButtonProps> = ({ children, icon, iconPosition = 'left', ...props }) => {
  return (
    <StyledIconButton $iconPosition={iconPosition} {...props}>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </StyledIconButton>
  );
};
