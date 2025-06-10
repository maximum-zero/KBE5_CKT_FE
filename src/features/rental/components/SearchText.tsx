import { TextInput } from '@/components/ui/input/input/TextInput';
import React, { useState, useCallback, memo, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ContentContainer,
  ErrorContainer,
  NoContentContainer,
  ResultContainer,
  SearchContainer,
  TitleContainer,
} from './SearchText.styles';

interface SearchTextProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  width?: string;
  label?: string;
  icon?: React.ReactNode;
  required?: boolean;
  errorText?: string;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;

  fetch: (query: string, signal: AbortSignal) => Promise<any>;
  renderResults?: (results: any[]) => React.ReactNode;
}

export const SearchText: React.FC<SearchTextProps> = memo(
  ({ id, onChange, onEnter, fetch, renderResults, ...props }) => {
    const [search, setSearch] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);

    const debounce = useCallback((func: (...args: any[]) => void, delay: number) => {
      let timeoutId: NodeJS.Timeout;
      return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    }, []);

    const fetchData = useCallback(
      async (query: string) => {
        if (!query.trim()) {
          setResults([]);
          setError(null);
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        setError(null);

        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        try {
          const response = await fetch(query, signal);
          setResults(response.list || response);
        } catch (err) {
          if (!axios.isCancel(err)) {
            const errorMessage = '데이터를 불러오는 데 실패했습니다.';
            setError(errorMessage);
          }
        } finally {
          setIsLoading(false);
          abortControllerRef.current = null;
        }
      },
      [fetch]
    );

    const debouncedFetchData = useCallback(
      debounce((query: string) => {
        fetchData(query);
      }, 500),
      [debounce, fetchData]
    );

    const handleTextInputChange = useCallback(
      (newValue: string) => {
        setSearch(newValue);
        onChange?.(newValue);
        debouncedFetchData(newValue);
      },
      [onChange, debouncedFetchData]
    );

    const handleTextInputEnter = useCallback(
      (valueOnEnter: string) => {
        onEnter?.(valueOnEnter);
        fetchData(valueOnEnter);
      },
      [onEnter, fetchData]
    );

    useEffect(() => {
      return () => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
      };
    }, []);

    const showError = error !== null;
    const showInitialPrompt = !isLoading && !error && search.trim() === '' && results.length === 0;
    const showNoResults = !isLoading && !error && search.trim() !== '' && results.length === 0;
    const showResultsList = !isLoading && !error && results.length > 0 && typeof renderResults === 'function';

    return (
      <SearchContainer>
        <TextInput id={id} value={search} onChange={handleTextInputChange} onEnter={handleTextInputEnter} {...props} />

        {/* ResultContainer는 이제 항상 렌더링됩니다. */}
        <ResultContainer>
          <TitleContainer>검색 결과</TitleContainer>
          <ContentContainer>
            <AnimatePresence mode="wait">
              {showError && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  <ErrorContainer>에러: {error}</ErrorContainer>
                </motion.div>
              )}
              {showInitialPrompt && (
                <motion.div
                  key="initial-prompt"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  <NoContentContainer>검색어를 입력해주세요.</NoContentContainer>
                </motion.div>
              )}
              {showNoResults && (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  <NoContentContainer>검색 결과가 존재하지 않습니다.</NoContentContainer>
                </motion.div>
              )}
              {showResultsList && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  {renderResults(results)}
                </motion.div>
              )}
            </AnimatePresence>
          </ContentContainer>
        </ResultContainer>
      </SearchContainer>
    );
  }
);

SearchText.displayName = 'SearchText';
