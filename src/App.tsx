import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ThemeContextProvider, useTheme } from '@/context/ThemeContext';
import GlobalStyle from '@/styles/GlobalStyle';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/auth/Login';

const StyledThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTheme } = useTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

function App() {
  return (
    <ThemeContextProvider>
      <StyledThemeProviderWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </StyledThemeProviderWrapper>
    </ThemeContextProvider>
  );
}

export default App;
