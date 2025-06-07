import React, { createContext, useContext, useState, type ReactNode, useCallback } from 'react';
import { LoadingSpinner } from '@/components/ui/loading/LoadingSpinner'; // 로딩 스피너 컴포넌트 임포트

interface LoadingContextType {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // 로딩을 보여주는 함수
  const showLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  // 로딩을 숨기는 함수
  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      <LoadingSpinner isLoading={isLoading} /> {/* 전역 로딩 스피너 */}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
