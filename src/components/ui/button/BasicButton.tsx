import React from 'react';

import { StyledBasicButton } from './Button.styles';
import type { BasicButtonProps } from './types';

export const BasicButton: React.FC<BasicButtonProps> = ({ children, buttonType = 'primary', ...props }) => {
  return (
    <StyledBasicButton $buttonType={buttonType} {...props}>
      {children}
    </StyledBasicButton>
  );
};
