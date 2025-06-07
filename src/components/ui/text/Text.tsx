import React from 'react';

import { BaseSpan, HeadingText, SubheadingText, LabelText, PlaceholderText, ErrorText } from './Text.styles';
import type { TextProps } from './types';

export const Text: React.FC<TextProps> = ({ type = 'body1', children, ...props }) => {
  switch (type) {
    case 'heading':
      return <HeadingText {...props}>{children}</HeadingText>;
    case 'subheading':
      return <SubheadingText {...props}>{children}</SubheadingText>;
    case 'label':
      return <LabelText {...props}>{children}</LabelText>;
    case 'placeholder':
      return <PlaceholderText {...props}>{children}</PlaceholderText>;
    case 'error':
      return <ErrorText {...props}>{children}</ErrorText>;
    case 'body1':
    default:
      return <BaseSpan {...props}>{children}</BaseSpan>;
  }
};
