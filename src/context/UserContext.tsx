import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    console.log('user', user);
    console.log('preferences', preferences);
  }, [user, preferences]);

  useEffect(() => {
    const fetchPreferences = async () => {
      const { data } = await axios.get('/api/preferences');
      setPreferences(data.preferences);
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
    <UserContext.Provider value={{ user, preferences, setPreferences }}>
      {children}
    </UserContext.Provider>
  );
};
