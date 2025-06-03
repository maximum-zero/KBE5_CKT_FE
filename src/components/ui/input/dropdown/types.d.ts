export interface DropdownOption {
  value: string | number;
  label: string;
}

export interface DropdownProps {
  id?: string;
  label?: string;
  options: DropdownOption[];
  initialValue?: string | number;
  placeholder?: string;
  onSelect?: (value: string | number) => void;
  width?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export interface FieldContainerProps {
  $width?: string;
}

export interface StyledDropdownContainerProps {
  $width?: string;
  $isDisabledOrReadOnly: boolean;
  $isOpen: boolean;
}

export interface DropdownIconProps {
  $isOpen: boolean;
}
