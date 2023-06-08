import { useEffect, useState } from 'react';

interface UserPreferences {
  weatherWidget: boolean;
}

export default function useUserPreferences() {
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    weatherWidget: true,
  });

  function toggleWeatherWidget() {
    setUserPreferences({
      ...userPreferences,
      weatherWidget: !userPreferences.weatherWidget,
    });
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
  }

  useEffect(() => {
    const preferences = localStorage.getItem('userPreferences');
    if (preferences) {
      setUserPreferences(JSON.parse(preferences));
    } else {
      localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
    }
  }, []);

  return { userPreferences, toggleWeatherWidget };
}
