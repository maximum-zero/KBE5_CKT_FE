import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LayoutMain = styled.main`
  width: 100%;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 24px;
  background: var(--color-background);
`;

export const LayoutHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  img {
    width: 32px;
    height: 32px;
    fill: var(--color-primary);
  }
`;

export const MainNavigation = styled.nav`
  display: flex;
  gap: 8px;

  & > a {
    width: 120px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-gray600);
    text-decoration: none;
    cursor: pointer;
    border-radius: 4px;

    &.active {
      color: var(--color-primaryDark);
      background: var(--color-primaryLight);
    }

    &:hover {
      color: var(--color-primaryDark);
    }
  }
`;
