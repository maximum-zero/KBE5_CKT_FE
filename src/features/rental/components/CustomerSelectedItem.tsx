import { memo } from 'react';
import { Container, Content, ItemContainer, Title } from './CustomerSelectedItem.styles';
import type { SearchCustomerSummary } from '../types';

interface CustomerSelectedItemProps {
  item: SearchCustomerSummary;
}

export const CustomerSelectedItem: React.FC<CustomerSelectedItemProps> = memo(({ item }) => {
  return (
    <Container>
      <ItemContainer>
        <Title>고객명</Title>
        <Content>{item.customerName}</Content>
      </ItemContainer>
      <ItemContainer>
        <Title>전화번호</Title>
        <Content>{item.phoneNumber}</Content>
      </ItemContainer>
      <ItemContainer>
        <Title>이메일</Title>
        <Content>{item.email}</Content>
      </ItemContainer>
    </Container>
  );
});
