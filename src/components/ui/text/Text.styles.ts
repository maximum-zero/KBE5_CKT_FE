import styled from 'styled-components';
import { motion } from 'framer-motion';

export const BaseSpan = styled(motion.span)`
  word-wrap: break-word;
`;

export const HeadingText = styled(BaseSpan)`
  color: ${({ theme }) => theme.gray900};
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
`;

export const SubheadingText = styled(BaseSpan)`
  color: ${({ theme }) => theme.gray800};
  font-size: 16px;
  font-weight: 900;
  line-height: 19.2px;
`;

export const LabelText = styled(BaseSpan)`
  color: ${({ theme }) => theme.gray700};
  font-size: 14px;
  font-weight: 500;
  line-height: 16.8px;
`;

export const PlaceholderText = styled(BaseSpan)`
  color: ${({ theme }) => theme.gray500};
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
`;

export const ErrorText = styled(BaseSpan)`
  color: ${({ theme }) => theme.red};
  font-size: 14px;
  font-weight: 500;
  line-height: 16.8px;
`;
