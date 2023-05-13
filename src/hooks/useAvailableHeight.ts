import { useState, useEffect } from 'react';

export default function useAvailableHeight() {
  const [availableHeight, setAvailableHeight] = useState(0);

  const calculateAvailableHeight = () => {
    const appBarElement = document.getElementById('app-bar-mui');
    return appBarElement
      ? window.innerHeight - appBarElement.offsetHeight
      : window.innerHeight;
  };

  useEffect(() => {
    function handleResize() {
      setAvailableHeight(calculateAvailableHeight());
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return availableHeight;
}
