import React from 'react';

import { StyledMiniButton } from './Button.styles';
import type { StyledMiniButtonProps } from './types';

export interface MiniButtonProps extends StyledMiniButtonProps {
  children: React.ReactNode;
}

/**
 * 작고 콤팩트한 디자인의 버튼 컴포넌트입니다.
 * 다양한 버튼 타입(primary, gray, red, basic)을 지원하며,
 * 아이콘과 텍스트를 함께 사용할 수 있도록 최적화되어 있습니다.
 */
export const MiniButton: React.FC<MiniButtonProps> = ({ children, $buttonType = 'primary', icon, ...props }) => {
  console.log('PlusIcon > ', icon);

  return (
    <StyledMiniButton $buttonType={$buttonType} {...props}>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </StyledMiniButton>
  );
};
