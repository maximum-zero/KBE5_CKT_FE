import { memo } from 'react';
import { Container, Content, ItemContainer, Title } from './VehicleSelectedItem.styles';
import type { SearchVehicleSummary } from '../types';

interface VehicleSelectedItemProps {
  item: SearchVehicleSummary;
}

export const VehicleSelectedItem: React.FC<VehicleSelectedItemProps> = memo(({ item }) => {
  return (
    <Container>
      <ItemContainer>
        <Title>차량 번호</Title>
        <Content>{item.registrationNumber}</Content>
      </ItemContainer>
      <ItemContainer>
        <Title>제조사</Title>
        <Content>{item.manufacturer}</Content>
      </ItemContainer>
      <ItemContainer>
        <Title>모델명</Title>
        <Content>{item.modelName}</Content>
      </ItemContainer>
      <ItemContainer>
        <Title>연식</Title>
        <Content>{item.modelYear}년</Content>
      </ItemContainer>
    </Container>
  );
});
