/**
 * `Theme.js` is a JavaScript file that defines a context for managing theme settings in a React application.
 * It provides a `ThemeProvider` component that allows toggling between light and dark themes.
 * The themes are defined as JavaScript objects and are provided to the rest of the application through context.
 */

import React, {createContext, useContext, useState} from 'react';


const ThemeContext = createContext();

/**
 * ThemeProvider component that provides theme context to its children.
 * It allows toggling between light and dark themes.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the theme context.
 * @returns {JSX.Element} The rendered component.
 */
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
