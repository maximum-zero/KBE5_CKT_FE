import styled from 'styled-components';

export const UserCircleContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-gray800);
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  user-select: none;
`;

export const Logout = styled.div`
  & > a {
    display: flex;
    align-items: flex-end;

    font-size: 12px;
    color: var(--color-gray600);
    cursor: pointer;
  }
`;

export const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: var(--color-primary); /* theme 대신 CSS 변수 사용 */
  font-size: 18px; /* 글자 크기 조정 */
  font-weight: bold; /* 글자 굵기 조정 */
`;
