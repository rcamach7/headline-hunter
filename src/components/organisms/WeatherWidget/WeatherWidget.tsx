import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import DayCard from './DayCard';
import { Weather } from '@/lib/types';

interface Props {
  onDisplayStyling: Record<string, unknown>;
}

export default function WeatherWidget({ onDisplayStyling }: Props) {
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
        setWeather(data.weather as Weather);
      }
    };

    fetchWeather();
  }, [location]);

  if (!weather) {
    return <></>;
  }
  return (
    <Box sx={{ ...onDisplayStyling }}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: 175,
          maxWidth: 275,
          gap: { md: 2, lg: 3 },
          height: '100vh',
        }}
      >
        <Typography variant="h5" sx={{ pb: 1, textAlign: 'center' }}>
          {weather.name}
        </Typography>
        {weather?.forecastsByDay.map((dayForecast) => (
          <DayCard key={dayForecast.date} dayForecast={dayForecast} />
        ))}
      </Box>
    </Box>
  );
}
