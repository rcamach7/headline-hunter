import { createContext, useContext } from 'react';

export const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};
