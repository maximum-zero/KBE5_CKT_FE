import styled from 'styled-components';
import type { BadgeStyles } from './types'; // 새로 만든 타입 import

// 재사용될 BaseSpan이 필요하다면 여기에 정의
const BaseSpan = styled.span`
  /* 기본 스타일: 필요시 추가 */
`;

export const StyledBadge = styled.div<BadgeStyles>`
  width: 80px;
  height: 28px;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  display: flex;
  color: var(--color-white); /* 텍스트 색상은 항상 흰색이므로 여기에 직접 설정 */
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  background: ${({ $badgeColor }) => {
    switch ($badgeColor) {
      case 'primary':
        return 'var(--color-primary)';
      case 'green':
        return 'var(--color-green)';
      case 'orange':
        return 'var(--color-orange)';
      case 'purple':
        return 'var(--color-purple)';
      case 'red':
        return 'var(--color-red)';
      case 'gray':
      default:
        return 'var(--color-gray500)';
    }
  }};
`;

export const StyledBadgeTextSpan = styled(BaseSpan)`
  color: white; // 텍스트 색상은 Badge 컨테이너에서 이미 설정되었으므로 사실상 중복.
  // 그러나 BadgeTextSpan만 단독으로 사용될 경우를 위해 유지하는 것이 좋습니다.
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
`;
