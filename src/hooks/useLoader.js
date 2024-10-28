import { useCallback, useState } from 'react';

function useLoader(apiCall) {
  const [isLoading, setIsLoading] = useState(false);

  const executeApiCall = useCallback(async (...args) => {
    setIsLoading(true);

    try {
      const result = await apiCall(...args);
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [apiCall]);

  return { isLoading, executeApiCall };
}

export default useLoader;
