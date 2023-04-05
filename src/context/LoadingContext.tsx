import { createContext } from 'react';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { PageLoading } from '@/components/atoms';
export const LoadingContext = createContext({
  setIsPageLoading: (value: boolean) => {},
  isPageLoading: true,
});

export const useLoadingContext = () => {
  const loadingContext = useContext(LoadingContext);
  if (LoadingContext === null) {
    throw new Error('Error retrieving context for loading');
  }
  return loadingContext;
};

export const LoadingProvider = ({ children }) => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let timer;

    const handleRouteChangeStart = () => setIsPageLoading(true);
    const handleRouteChangeComplete = () => {
      timer = setTimeout(() => setIsPageLoading(false), 1000);
    };
    const handleRouteChangeError = () => setIsPageLoading(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      clearTimeout(timer);
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router.events]);
  return (
    <LoadingContext.Provider value={{ setIsPageLoading, isPageLoading }}>
      {children}
      {isPageLoading && <PageLoading />}
    </LoadingContext.Provider>
  );
};
