import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  useEffect(() => {
    if (session) {
      setUser(session.user);
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
