import { useEffect, useState } from 'react';

export interface UserPreferences {
  showWeatherWidget: boolean;
}

export default function useUserPreferences() {
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    showWeatherWidget: true,
  });

  function toggleWeatherWidget() {
    setUserPreferences((prevState) => ({
      ...prevState,
      weatherWidget: !prevState.showWeatherWidget,
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
