import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';

import { UserType, UserContextType } from '@/types/users';

interface UserProviderProps {
  children: ReactNode;
}
// Extend your context type if needed
interface ExtendedUserContextType extends UserContextType {
  isLoading: boolean;
}

// Create the context
const UserContext = createContext<ExtendedUserContextType | undefined>(undefined);

// Custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true); // <-- Add loading state

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false); // <-- Done loading
  }, []);

  const login = (userData: UserType, token: string) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const update = (userData: UserType) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, update, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
