import { useEffect, useState } from 'react';

interface UserPreferences {
  weatherWidget: boolean;
}

export default function useUserPreferences() {
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    weatherWidget: true,
  });

  function toggleWeatherWidget() {
    setUserPreferences((prevState) => ({
      ...prevState,
      weatherWidget: !prevState.weatherWidget,
    }));
  }

  useEffect(() => {
    const preferences = localStorage.getItem('userPreferences');
    if (preferences) {
      setUserPreferences(JSON.parse(preferences));
    } else {
      localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
    }
  }, [userPreferences]);

  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  return { userPreferences, toggleWeatherWidget };
}
