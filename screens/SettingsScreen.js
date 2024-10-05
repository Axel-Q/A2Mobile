import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/Theme';

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