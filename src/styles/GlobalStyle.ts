import 'normalize.css';

import { createGlobalStyle, css } from 'styled-components';
import { createThemeCssVars } from './themes';

const GlobalStyle = createGlobalStyle`
  /* Pretendard 폰트 정의 */
  @font-face {
    font-family: 'Pretendard';
    font-weight: 100;
    font-display: swap;
    src: local('Pretendard Thin'), url('/fonts/Pretendard-Thin.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 200;
    font-display: swap;
    src: local('Pretendard ExtraLight'), url('/fonts/Pretendard-ExtraLight.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    font-display: swap;
    src: local('Pretendard Light'), url('/fonts/Pretendard-Light.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src: local('Pretendard Regular'), url('/fonts/Pretendard-Regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-display: swap;
    src: local('Pretendard Medium'), url('/fonts/Pretendard-Medium.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-display: swap;
    src: local('Pretendard SemiBold'), url('/fonts/Pretendard-SemiBold.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-display: swap;
    src: local('Pretendard Bold'), url('/fonts/Pretendard-Bold.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 800;
    font-display: swap;
    src: local('Pretendard ExtraBold'), url('/fonts/Pretendard-ExtraBold.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 900;
    font-display: swap;
    src: local('Pretendard Black'), url('/fonts/Pretendard-Black.woff2') format('woff2');
  }

  ${props => css`
    html {
      // 선택된 테마의 CSS 변수를 여기에 적용
      ${createThemeCssVars(props.theme)}

      font-family: 'Pretendard', sans-serif;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: var(--color-gray900);
      background-color: var(--color-gray200);

      /* 기타 전역 스타일 */
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;

      /* 최소 너비 설정 */
      min-width: 1280px;

      /* 화면 너비가 min-width보다 작아질 경우 가로 스크롤바 생성 */
      overflow-x: auto;
    }

    html,
    body {
      overflow: auto; /* 또는 hidden, scroll */
      /* WebKit (Chrome, Safari) */
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
      }
      &:hover::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.4);
      }
      /* Firefox */
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
    }

    /* 모든 요소에 box-sizing 적용 */
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
  `}
`;

export default GlobalStyle;
