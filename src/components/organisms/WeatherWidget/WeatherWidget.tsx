// components/WeatherWidget.js
import React, { useEffect, useState } from 'react';

export default function WeatherWidget() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (location) {
        const url = `/api/weather?latitude=${location.latitude}&longitude=${location.longitude}`;

        const response = await fetch(url);
        const data = await response.json();
        setWeather(data);
      }
    };

    fetchWeather();
  }, [location]);

  if (!weather) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Weather Widget</h2>
      <p>
        {weather.name}, {weather.sys.country}
      </p>
      <p>{weather.weather[0].main}</p>
      <p>{Math.round(weather.main.temp)}°C</p>
    </div>
  );
}
