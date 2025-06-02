export interface CustomTheme {
  primary: string;
  primaryHover: string;
  background: string;
  backgroundHover: string;
  text: string;
  placeholder: string;
  border: string;
}

// 공통 테마 속성
const commonTheme = {
  background: '#FFFFFF',
  text: '#111111',
  placeholder: '#94A3B8',
  border: '#CBD5E1',
};

// 2. 개별 테마 객체 정의
export const blueTheme: CustomTheme = {
  ...commonTheme,
  primary: '#0070f3',
  primaryHover: '#005bb5',
  backgroundHover: '#f0f4f8',
};

export const pinkTheme: CustomTheme = {
  ...commonTheme,
  primary: '#ff69b4',
  primaryHover: '#d13f87',
  backgroundHover: '#f7e2eb',
};

export const brownTheme: CustomTheme = {
  ...commonTheme,
  primary: '#8B4513',
  primaryHover: '#6a340f',
  backgroundHover: '#e0e0c8',
};

// 3. 테마 맵 정의 (테마 선택을 위한)
export const themeMap = {
  blue: blueTheme,
  pink: pinkTheme,
  brown: brownTheme,
};

// 4. 테마 키 타입 정의
export type ThemeKey = keyof typeof themeMap;

// 5. CSS 변수 생성 함수 (필요시 사용)
// - 이 함수는 주로 전역적으로 CSS 변수를 설정할 때 유용합니다.
// - 컴포넌트 내부에서는 props.theme를 직접 사용하는 것이 더 일반적입니다.
export const createThemeCssVars = (theme: CustomTheme) => {
  return Object.entries(theme)
    .map(([key, value]) => `--color-${key}: ${value};`)
    .join('\n');
};
