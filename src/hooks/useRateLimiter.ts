import { useEffect, useState } from 'react';

const MAX_REQUESTS = 2;
const TIME_WINDOW = 60 * 60 * 1000; // 1 hour

export function useRateLimiter() {
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    checkRateLimit();
  }, []);

  const checkRateLimit = () => {
    const now = Date.now();
    const timestamps = JSON.parse(
      localStorage.getItem('requestTimestamps') || '[]'
    );
    const validTimestamps = timestamps.filter((ts) => now - ts < TIME_WINDOW);

    setIsRateLimited(validTimestamps.length >= MAX_REQUESTS);

    localStorage.setItem('requestTimestamps', JSON.stringify(validTimestamps));
  };

  const recordRequest = () => {
    const timestamps = JSON.parse(
      localStorage.getItem('requestTimestamps') || '[]'
    );
    console.log('hook recorded request');
    timestamps.push(Date.now());
    localStorage.setItem('requestTimestamps', JSON.stringify(timestamps));

    checkRateLimit();
  };

  return { isRateLimited, recordRequest };
}
