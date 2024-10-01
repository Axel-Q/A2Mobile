import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Activities from "../screens/Activities";
import {CustomThemeProvider} from "../components/ThemeColorSwitch";
import Diet from "../screens/Diet";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const BottomTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
                backgroundColor: '#009783',
            },
        }}>
            <Tab.Screen name="Activities" component={Activities}
                        options={{
                            tabBarIcon: ({color, size}) => (
                                <Feather name="activity" size={24} color="black"/>),
                        }}/>
            <Tab.Screen name="Diet" component={Diet}
                        options={{
                            tabBarIcon: ({color, size}) => (
                                <Ionicons name="fast-food-outline" size={24} color="black"/>),
                        }}/>
        </Tab.Navigator>
    );
}

export const Navigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={BottomTabNavigator} options={{
                headerShown: false,

            }}/>
        </Stack.Navigator>
    );
}