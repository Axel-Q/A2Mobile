import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {ThemeProvider} from "./helperFile/Theme";
import InfoDisplayScreen from './screens/InfoDisplayScreen';
import {Navigation} from './navigation/Navigation';
import {NavigationContainer} from "@react-navigation/native";


export default function App() {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <StatusBar style="auto"/>
                    <Navigation/>
            </NavigationContainer>
        </ThemeProvider>
    );
}


