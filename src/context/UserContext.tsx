import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { UserContextType } from './UserContext.types';

export const UserContext = createContext(null);
export const useUserContext = (): UserContextType => {
  const userContext = useContext(UserContext);
  if (userContext === null) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return userContext;
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPreferences = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get('/api/preferences');
        setPreferences(data.preferences);
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
      setIsLoading(false);
    };

    if (session) {
      setUser(session.user);
      fetchPreferences();
    } else {
      setUser(null);
      setPreferences(null);
    }
  }, [session]);

  return (
    <UserContext.Provider
      value={{ user, preferences, setPreferences, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};
