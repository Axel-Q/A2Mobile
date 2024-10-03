import React, {createContext, useState} from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const lightTheme = {
        backgroundColor: '#d31919',
        color: '#9f5151',
    }
    const darkTheme = {
        backgroundColor: '#dacece',
        color: '#aa8402',
    }

    const [theme, setTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setTheme((theme) => (theme === lightTheme ? darkTheme : lightTheme));
    };

    return (
        <ThemeContext.Provider value={{theme}}>
            {children}
        </ThemeContext.Provider>
    );
}
