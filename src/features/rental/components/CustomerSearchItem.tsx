import { memo } from 'react';
import { Container, ContentContainer, TitleContainer } from './CustomerSearchItem.styles';
import type { SearchCustomerSummary } from '../types';

interface CustomerSearchItemProps {
  item: SearchCustomerSummary;
  onClick?: (item: SearchCustomerSummary) => void;
}

export const CustomerSearchItem: React.FC<CustomerSearchItemProps> = memo(({ item, onClick }) => {
  const handleClick = () => {
    onClick?.(item);
  };

  return (
    <Container onClick={handleClick}>
      <TitleContainer>{item.customerName}</TitleContainer>
      <ContentContainer>
        {item.phoneNumber} | {item.email}
      </ContentContainer>
    </Container>
  );
});
