import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION;
const BASE_URL = `${API_URL}/${API_VERSION}`;

type FetchResponse<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export const useApi = <T>(url: string, options?: RequestInit) => {
  const [response, setResponse] = useState<FetchResponse<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/${url}`, {
          ...options,
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResponse({ data, loading: false, error: null });
      } catch (error) {
        if (error instanceof Error) {
          setResponse({ data: null, loading: false, error });
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, options]);

  return response;
};
