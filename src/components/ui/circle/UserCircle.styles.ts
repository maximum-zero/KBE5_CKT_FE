import styled from 'styled-components';

export const UserCircleContainer = styled.div`
  position: relative; /* 드롭다운 메뉴 위치 지정을 위해 추가 */
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer; /* 클릭 가능함을 나타냄 */
  user-select: none; /* 텍스트 드래그 방지 */
  color: var(--color-gray800); /* 사용자 이름 텍스트 색상 */
  font-weight: 600; /* 사용자 이름 텍스트 굵기 */
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

export const UserMenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: white;
  border: 1px solid var(--color-gray300);
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 160px;
  padding: 8px 0;
  z-index: 1000;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: 10px 16px;
    font-size: 14px;
    color: var(--color-gray700);
    cursor: pointer;

    &:hover {
      background: var(--color-gray100);
      color: var(--color-primaryDark);
    }

    &:active {
      background: var(--color-gray200);
    }
  }
`;
