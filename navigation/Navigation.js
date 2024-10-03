import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import InfoDisplayScreen from "../screens/InfoDisplayScreen";
import {CustomThemeProvider} from "../components/ThemeColorSwitch";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import {SettingsScreen} from "../screens/SettingsScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import {myStyle} from "../helperFile/myStyle";
import {EntryScreen} from "../screens/EntryScreen";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const BottomTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={({route}) => ({
            ...myStyle.BottomTabNavigator, tabBarIcon: ({color, size}) => {
                let iconName;
                let IconComponent;
                if (route.name === 'Activities') {
                    iconName = 'activity';
                    IconComponent = Feather;
                } else if (route.name === 'Diet') {
                    iconName = 'fast-food-outline';
                    IconComponent = Ionicons;
                } else if (route.name === 'Settings') {
                    iconName = 'setting';
                    IconComponent = AntDesign;
                }
                return <IconComponent name={iconName} size={size} color={color}/>;
            },
        })}
        >
            <Tab.Screen name="Activities" component={InfoDisplayScreen}/>
            <Tab.Screen name="Diet" component={InfoDisplayScreen}/>
            <Tab.Screen name="Settings" component={SettingsScreen}/>
        </Tab.Navigator>
    )
        ;
}

export const Navigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={BottomTabNavigator} options={{
                headerShown: false,
            }}/>
            <Stack.Screen name="ActivityEntry" component={CustomThemeProvider}/>
            <Stack.Screen name={"DietEntry"} component={EntryScreen}/>
            <Stack.Screen name={"Settings"} component={SettingsScreen}/>
        </Stack.Navigator>
    );
}