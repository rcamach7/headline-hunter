import { useEffect, useState } from 'react';
import { Weather } from '@/lib/types';

export default function WeatherWidget() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState<Weather>(null);

  const fetchLocationByIP = async () => {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    setLocation({
      latitude: data.latitude,
      longitude: data.longitude,
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      const success = (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      };

      const error = (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          fetchLocationByIP();
        } else {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }
      };

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      console.error('Geolocation is not supported by this browser.');
      fetchLocationByIP();
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (location) {
        const url = `/api/weather?latitude=${location.latitude}&longitude=${location.longitude}`;

        const response = await fetch(url);
        const data = await response.json();
        setWeather(data as Weather);
      }
    };

    fetchWeather();
  }, [location]);

  /**
   * TESTING PURPOSES ONLY
   */
  useEffect(() => {
    if (weather) {
      console.log(weather);
    }
  }, [weather]);

  if (!weather) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Weather Widget</h2>
    </div>
  );
}
