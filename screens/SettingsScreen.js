/**
 * `SettingsScreen.js` is a JavaScript file that defines the `SettingsScreen` component for a React Native application.
 * This screen allows users to toggle the application's theme between light and dark modes.
 * It uses context to access the current theme and a function to toggle the theme.
 */

import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/Theme';


/**
 * SettingsScreen component that allows users to toggle the application's theme.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const SettingsScreen = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                onPress={toggleTheme}
                style={{
                    backgroundColor: theme.headerBottom,
                    padding: 10,
                    borderRadius: 5,
                }}
            >
                <Text style={{ color: 'white' }}>Toggle Theme</Text>
            </TouchableOpacity>
        </View>
    );
};