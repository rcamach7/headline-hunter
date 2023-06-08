import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

import { User } from '@/lib/types';
import { useRateLimiter, useUserPreferences, UserPreferences } from 'src/hooks';

interface UserContextType {
  user: User | null;
  refreshUser: () => {};
  isRateLimited: boolean;
  recordRequest: () => {};
  userPreferences: UserPreferences;
  toggleWeatherWidget: () => {};
}

export const UserContext = createContext(null);
export const useUserContext = (): UserContextType => {
  const userContext = useContext(UserContext);
  if (userContext === null) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return userContext;
};

export const UserContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>(null);
  const { isRateLimited, recordRequest } = useRateLimiter();
  const { userPreferences, toggleWeatherWidget } = useUserPreferences();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user');
      setUser(data.user as User);
    } catch (error) {
      console.error('Error fetching user', error);
    }
  };

  const refreshUser = () => {
    fetchUser();
  };

  useEffect(() => {
    if (session) {
      fetchUser();
    }
  }, [session]);

  return (
    <UserContext.Provider
      value={{
        user,
        refreshUser,
        isRateLimited,
        recordRequest,
        userPreferences,
        toggleWeatherWidget,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
