import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { User } from '@/lib/types';

interface UserContextType {
  user: User | null;
  refreshUser: () => {};
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
    <UserContext.Provider value={{ user, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
