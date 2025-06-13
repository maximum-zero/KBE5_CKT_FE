import React from 'react';
import { CardContainer, CardContent, LicensePlateText, CarInfoText } from './VehicleCard.styles';

interface VehicleCardProps {
  id: number;
  licensePlate: string;
  carInfo: string;
  onClick?: (id: number) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ id, licensePlate, carInfo, onClick }) => {
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <CardContainer onClick={handleClick} style={{ cursor: 'pointer' }}>
      <CardContent>
        <LicensePlateText>{licensePlate}</LicensePlateText>
        <CarInfoText>{carInfo}</CarInfoText>
      </CardContent>
    </CardContainer>
  );
};

export default VehicleCard;
