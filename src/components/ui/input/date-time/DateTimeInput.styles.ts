// src/components/ui/date-time-input/DateTimeInput.styles.ts
import styled, { css } from 'styled-components';
import type { FieldContainerProps, StyledDateTimeInputContainerProps } from './types'; // types.ts 파일의 타입들을 확인하세요.

export const FieldContainer = styled.div<FieldContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px; /* 에러 텍스트 공간 고려 */
  min-width: ${({ $width }) => $width || '100%'};
`;

export const StyledLabel = styled.label`
  color: var(--color-gray700);
  font-size: 14px;
  font-weight: 500;
  line-height: 16.8px;
  user-select: none; /* 텍스트 선택 방지 */
`;

export const StyledDateTimeInputContainer = styled.div<StyledDateTimeInputContainerProps>`
  align-self: stretch;
  height: 40px;
  padding-left: 12px;
  padding-right: 12px;
  background: var(--color-white);
  border-radius: 6px;
  outline: 1px var(--color-gray400) solid;
  outline-offset: -1px;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
  width: 100%;
  cursor: pointer;
  box-sizing: border-box;
  transition: outline-color 0.2s ease;

  // $isFocused 상태 스타일
  ${({ $isFocused, $isError }) =>
    $isFocused &&
    !$isError && // 에러가 아닐 때만 primary 색상
    css`
      outline: 1px var(--color-primary) solid;
      outline-offset: -1px;
    `}

  // $isError 상태 스타일 (우선순위 높음)
  ${({ $isError, $isFocused }) =>
    $isError &&
    css`
      outline: 1px var(--color-red) solid; /* 에러 시 빨간 테두리 */
      outline-offset: -1px;
      // 에러 상태이고 포커스도 되어있을 경우, 여전히 에러 색상 유지
      ${$isFocused &&
      css`
        outline: 1px var(--color-red) solid;
      `}
    `}

  // disabled 또는 readOnly 상태 스타일
  ${({ $isDisabledOrReadOnly, $isError }) =>
    $isDisabledOrReadOnly &&
    css`
      background: var(--color-gray200);
      cursor: not-allowed;
      span {
        color: var(--color-gray600);
      }
      svg path {
        fill: var(--color-gray600);
      }
      /* 비활성화/읽기 전용 상태에서는 포커스/호버 시 테두리 고정 */
      &:focus-within,
      &:hover {
        outline: 1px var(--color-gray400) solid;
      }
      // disabled/readOnly 상태라도 에러가 있으면 에러 색상 유지
      ${$isError &&
      css`
        outline: 1px var(--color-red) solid;
      `}
    `}

  .react-datepicker-wrapper {
    flex-grow: 1;
    display: flex;
    align-items: center;
    height: 100%;
  }

  .react-datepicker__input-container {
    height: 100%;
    display: flex;
    align-items: center;
    flex-grow: 1;
    font-family: 'Poppins', 'Noto Sans KR', sans-serif;
    font-size: 14px;
    line-height: 16.8px;
    color: var(--color-gray900);
  }

  .react-datepicker__input-container input {
    border: none;
    background: transparent;
    outline: none;
    width: 100%;
    height: 100%;
    cursor: pointer;

    &::placeholder {
      color: var(--color-gray600);
    }
    &:disabled {
      cursor: not-allowed;
    }
  }

  /* react-datepicker 달력 팝업 자체 스타일 */
  .react-datepicker {
    border: 1px solid var(--color-gray300);
    border-radius: 8px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }

  /* 헤더 스타일 */
  .react-datepicker__header {
    background-color: var(--color-primary);
    color: var(--color-white);
    border-bottom: none;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    color: var(--color-white);
  }

  .react-datepicker__header__dropdown {
    margin: 8px 0;
  }

  /* 월/년 선택 드롭다운 스타일 */
  .react-datepicker__month-dropdown-container,
  .react-datepicker__year-dropdown-container {
    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      background-color: var(--color-white);
      color: var(--color-primary);
      border: 1px solid var(--color-primaryLight);
      border-radius: 4px;
      padding: 2px 20px 2px 8px;
      cursor: pointer;
      font-size: 14px;
      line-height: 1.2;
      height: 30px;

      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 8px center;
      background-size: 12px;

      &:focus {
        outline: none;
      }
    }
  }

  /* 요일 이름 스타일 (일, 월, 화...) */
  .react-datepicker__day-name {
    color: var(--color-white);
    font-weight: 600;
    width: 2.2rem;
    margin: 0.166rem;
  }

  /* 개별 날짜 셀 스타일 */
  .react-datepicker__day {
    color: var(--color-gray800);
    width: 2.2rem;
    height: 2.2rem;
    line-height: 2.2rem;
    margin: 0.166rem;

    &:hover {
      background-color: var(--color-primaryLight);
      color: var(--color-primaryDark);
    }
  }

  /* 선택된 날짜 셀 스타일 */
  .react-datepicker__day--selected {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  /* 오늘 날짜 스타일 */
  .react-datepicker__day--today {
    font-weight: bold;
    color: var(--color-white);
    background-color: var(--color-primary);
    border: none;
    border-radius: 50%;
  }

  /* 비활성화된 날짜 */
  .react-datepicker__day--disabled {
    color: var(--color-gray500);
    cursor: not-allowed;
    background-color: transparent;
  }

  /* 다른 달의 날짜 */
  .react-datepicker__day--outside-month {
    color: var(--color-gray400);
  }

  /* 달력 네비게이션 버튼 (이전/다음 달) */
  .react-datepicker__navigation {
    top: 10px;
    line-height: 1.7rem;
    &--previous {
      left: 10px;
      border-right-color: var(--color-white);
    }
    &--next {
      right: 90px;
      border-left-color: var(--color-white);
    }
    &:hover {
      opacity: 0.8;
    }
  }
  .react-datepicker__navigation-icon::before,
  .react-datepicker__navigation-icon::after {
    color: var(--color-white);
  }

  /* 시간 선택기 스타일 */
  .react-datepicker__time-container {
    border-left: 1px solid var(--color-gray300);
  }
  .react-datepicker__time {
    .react-datepicker__time-box {
      width: 100px; /* 시간 선택 박스 너비 */
      padding: 0;
    }
    ul.react-datepicker__time-list {
      list-style: none;
      margin: 0;
      height: 195px; /* 기본 높이 조정 */
      overflow-y: scroll;
      padding-right: 0;
    }
    .react-datepicker__time-list-item {
      height: 30px; /* 각 시간 항목 높이 */
      padding: 5px 10px;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        background-color: var(--color-primaryLight);
        color: var(--color-primaryDark);
      }
      &--selected {
        background-color: var(--color-primary);
        color: var(--color-white);
        font-weight: bold;
      }
    }
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item {
    &:hover {
      background-color: var(--color-primaryLight);
    }
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background-color: var(--color-primary);

    &:hover {
      background-color: var(--color-primary);
    }
  }
`;

export const CalendarIconContainer = styled.div`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray600);
  cursor: pointer;
`;
