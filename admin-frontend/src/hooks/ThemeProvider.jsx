import React, { useState, createContext, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const darkTheme = () => setTheme('dark');
  const lightTheme = () => setTheme('light');
  const value = { theme, darkTheme, lightTheme };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
