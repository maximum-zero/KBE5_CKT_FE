import styled from 'styled-components';

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px; /* 섹션 내 요소 간 간격 */
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2개씩 가로로 무조건 배치 */
  gap: 16px; /* 그리드 항목 간 간격 */
`;

export const FormFieldWrapper = styled.div`
  /* 각 폼 필드 컴포넌트 (TextInput, Dropdown)가 wrapper 내에서 잘 배치되도록 추가 스타일 필요 시 사용 */
  width: 100%; /* 내부 아이템이 grid 셀을 꽉 채우도록 */
`;

export const MemoSection = styled.div`
  display: flex;
  flex-direction: column;
`;
