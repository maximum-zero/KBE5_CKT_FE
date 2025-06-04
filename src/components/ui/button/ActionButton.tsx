import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { StyledActionButton } from './Button.styles';
import type { ButtonType } from './types';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  buttonType?: ButtonType;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, buttonType, ...props }) => {
  return (
    <StyledActionButton $buttonType={buttonType} {...props}>
      {icon}
    </StyledActionButton>
  );
};

export default ActionButton;
