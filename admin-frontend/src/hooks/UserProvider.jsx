import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants/config';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_URL}/auth/me`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });
        setError(err.response?.data?.message || 'Failed to fetch user data');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoading(false);
  };

  const logout = async () => {
    await axios.post(
      `${API_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    setUser(null);
    setIsLoading(false);
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
