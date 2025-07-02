import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LayoutMain = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: var(--color-white);
`;

export const Lnb = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 260px;
  height: 100vh;
  box-shadow: 4px 0 12px 0 rgba(0, 0, 0, 0.15);
`;

export const LnbTopContainer = styled.div`
  padding: 24px 24px 0px 24px;
`;

export const LnbBottomContainer = styled.div`
  padding: 12px 24px 24px 24px;
  border-top: 1px solid var(--color-gray300);
`;

export const Logo = styled(Link)`
  height: 36px;
  margin-bottom: 24px;
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > a {
    padding: 12px;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    gap: 12px;
    background: none;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-gray600);
    text-decoration: none;
    cursor: pointer;
    border-radius: 8px;

    &.active {
      color: var(--color-primaryDark);
      background: var(--color-primaryLight);
    }

    &:hover {
      background: var(--color-gray300);
    }
  }
`;

export const MainContainer = styled.div`
  min-width: 1020px;
  width: 100%;
  overflow-x: auto;
`;
