import { memo } from 'react';
import { Container, ContentContainer, TitleContainer } from './VehicleSearchItem.styles';
import type { SearchVehicleSummary } from '../types';

interface VehicleSearchItemProps {
  item: SearchVehicleSummary;
  onClick?: (item: SearchVehicleSummary) => void;
}

export const VehicleSearchItem: React.FC<VehicleSearchItemProps> = memo(({ item, onClick }) => {
  const handleClick = () => {
    onClick?.(item);
  };

  return (
    <Container onClick={handleClick}>
      <TitleContainer>{item.registrationNumber}</TitleContainer>
      <ContentContainer>
        {item.manufacturer} {item.modelName} ({item.modelYear}) | {item.fuelType}
      </ContentContainer>
    </Container>
  );
});
