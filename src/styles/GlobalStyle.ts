import 'normalize.css';

import { createGlobalStyle, css } from 'styled-components';
import { createThemeCssVars } from './themes';

const GlobalStyle = createGlobalStyle`
  ${props => css`
    html {
      // 선택된 테마의 CSS 변수를 여기에 적용
      ${createThemeCssVars(props.theme)}

      /* 폰트 설정 (웹 폰트 링크 또는 로컬 폰트 @font-face 이후에 적용) */
      font-family: 'Noto Sans KR', sans-serif;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: var(--color-text); /* CSS 변수를 통해 텍스트 색상 적용 */
      background-color: var(--color-background); /* CSS 변수를 통해 배경 색상 적용 */
    }
  `}


  /* 모든 요소에 box-sizing: border-box 적용 (매우 권장) */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* 링크 기본 스타일 제거 (선택 사항) */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* 버튼, 인풋 등 기본 스타일 제거 (선택 사항) */
  button, input, select, textarea {
    background: none;
    border: none;
    font: inherit;
    color: inherit;
    cursor: pointer;
    outline: none; /* 접근성을 위해 :focus 스타일 고려 */
  }

  /* 이미지 기본 스타일 */
  img, video {
    max-width: 100%;
    height: auto;
    display: block; /* 인라인 요소의 기본 여백 제거 */
  }
`;

export default GlobalStyle;
