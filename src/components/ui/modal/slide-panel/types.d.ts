import type React from 'react';

export interface SlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  width?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export interface PanelContainerProps {
  $isOpen: boolean;
  $width: string;
}

export interface PanelAnimatedContentProps {
  $isVisible: boolean;
  $maxHeight: string;
  $duration?: string;
}
