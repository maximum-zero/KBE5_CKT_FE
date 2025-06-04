import styled from 'styled-components';

// --- Typography Components ---
export const Heading1 = styled.span`
  color: var(--color-gray900);
  font-size: 24px;
  font-weight: 700;
  line-height: 28.8px;
  word-wrap: break-word;
`;

export const BodyText = styled.span`
  color: var(--color-gray600);
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
  word-wrap: break-word;
`;

export const LinkText = styled.a`
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  word-wrap: break-word;
`;

// --- Layout and Form Elements ---

export const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap; 24px;
`;

export const LoginForm = styled.div`
  width: 400px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 21px;
`;

export const LoginHeaderSection = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;

export const LoginContentSection = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
