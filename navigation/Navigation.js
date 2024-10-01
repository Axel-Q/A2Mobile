import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Activities from "../screens/Activities";
import {CustomThemeProvider} from "../components/ThemeColorSwitch";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Activities" component={Activities} />
        </Tab.Navigator>
    );
}

export const Navigation = () => {
    return (
        <CustomThemeProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={BottomTabNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        </CustomThemeProvider>
    );
}