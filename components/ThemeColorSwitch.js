import React, { createContext, useState } from 'react';

export const CustomThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleCustomTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <CustomThemeContext.Provider value={{ theme, toggleCustomTheme }}>
      {children}
    </CustomThemeContext.Provider>
  );
};