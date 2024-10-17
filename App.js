/**
 * `App.js` is a JavaScript file that defines the main entry point for a React Native application.
 * It sets up the application context and navigation structure.
 * The `ThemeProvider` is used to manage the application's theme, and the `NavigationContainer` is used to handle navigation.
 */

import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {ThemeProvider} from "./context/Theme";
import InfoDisplayScreen from './screens/InfoDisplayScreen';
import {Navigation} from './navigation/Navigation';
import {NavigationContainer} from "@react-navigation/native";


export default function App() {
    return (
        <ThemeProvider>
            <NavigationContainer >
                <StatusBar style="auto"/>
                    <Navigation/>
            </NavigationContainer>
        </ThemeProvider>
    );
}


