import React, {createContext, useContext, useState} from 'react';


const ThemeContext = createContext();
export const ThemeProvider = ({children}) => {
    const lightTheme = {
        headerBottom: '#026154',
        middlePart: '#edfffd',
        itermColor: '#faa5a5',
    }
    const darkTheme = {
        headerBottom: '#716b5f',
        middlePart: '#ecddc6',
        itermColor: 'rgb(184,184,1)',
    }
    const [isLightTheme, setIsLightTheme] = useState(true);
    const toggleTheme = () => {
        setIsLightTheme((prevTheme) => !prevTheme);
    };
    const theme = isLightTheme ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
export {ThemeContext};
