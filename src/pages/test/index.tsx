import { useLoadingContext } from '@/context/LoadingContext';
import { useEffect } from 'react';

export default function Test() {
  const { setIsPageLoading } = useLoadingContext();

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  return <>Test</>;
}
