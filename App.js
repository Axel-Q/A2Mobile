import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {CustomThemeProvider} from './components/ThemeColorSwitch';
import ActivitiesScreen from './screens/ActivitiesScreen';
import {Navigation} from './navigation/Navigation';
import {NavigationContainer} from "@react-navigation/native";


export default function App() {
    return (
        <CustomThemeProvider>
            <NavigationContainer>
                <StatusBar style="auto"/>
                    <Navigation/>
            </NavigationContainer>
        </CustomThemeProvider>
    );
}


