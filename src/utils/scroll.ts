/**
 * 브라우저의 스크롤바 너비를 계산합니다.
 * 이 함수는 패널 오픈 시 body 스크롤바가 사라질 때 발생하는
 * 레이아웃 점프를 방지하기 위한 패딩 계산에 사용됩니다.
 *
 * @returns {number} 스크롤바의 너비(px)를 반환합니다. 브라우저 환경이 아닐 경우 0을 반환합니다.
 */
export const getScrollbarWidth = (): number => {
  if (typeof window === 'undefined') return 0;

  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  outer.parentNode?.removeChild(outer);

  return scrollbarWidth;
};
