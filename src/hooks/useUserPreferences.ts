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
      showWeatherWidget: !prevState.showWeatherWidget,
    }));
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
