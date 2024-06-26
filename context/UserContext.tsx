/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthenticationUser } from '../shared/authentication/Authentication';

interface UserContextType {
    user: AuthenticationUser | undefined;
    setUser: React.Dispatch<React.SetStateAction<AuthenticationUser | undefined>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthenticationUser>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuthenticationContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
