import { useState, useEffect } from 'react';
import type { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('rag_user');
    const isAuth = localStorage.getItem('rag_auth') === 'true';

    if (storedUser && isAuth) {
      setUser({ username: storedUser });
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = (username: string) => {
    const newUser: User = { username };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('rag_user', username);
    localStorage.setItem('rag_auth', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('rag_user');
    localStorage.removeItem('rag_auth');
  };

  return { user, isAuthenticated, loading, login, logout };
};