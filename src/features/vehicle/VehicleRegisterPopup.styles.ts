import styled from 'styled-components';

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;

  /* 만약 특정 브라우저에서 grid-template-columns의 auto-fit이 문제라면, */
  /* 아래처럼 명확히 2열을 지정해 볼 수도 있습니다 (반응형 대응은 추가 미디어 쿼리 필요) */
  /* grid-template-columns: 1fr 1fr; */
`;

export const FormFieldWrapper = styled.div``;

export const MemoSection = styled.div`
  display: flex;
  flex-direction: column;
`;
