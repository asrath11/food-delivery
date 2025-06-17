import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants/config';
// Create context
const UserContext = createContext();

// Create provider
export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null instead of {}
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Example: fetch user on mount
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/auth/me`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, login }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context
export const useUser = () => useContext(UserContext);
