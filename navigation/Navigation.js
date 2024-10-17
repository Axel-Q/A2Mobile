/**
 * `Navigation.js` is a JavaScript file that sets up the navigation structure for a React Native application.
 * It uses React Navigation to create a bottom tab navigator and a stack navigator.
 * The bottom tab navigator includes screens for activities, diet, and settings, each with its own icon.
 * The stack navigator includes the home screen (which contains the bottom tab navigator) and an entry screen for adding new entries.
 */

import React, {useContext, useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import InfoDisplayScreen from "../screens/InfoDisplayScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import {SettingsScreen} from "../screens/SettingsScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import {EntryScreen} from "../screens/EntryScreen";
import {ItemContext} from "../context/ItemContext";
import {ThemeContext} from "../context/Theme";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * BottomTabNavigator component that sets up the bottom tab navigation.
 * It includes screens for activities, diet, and settings, each with its own icon.
 *
 * @returns {JSX.Element} The rendered component.
 */
const BottomTabNavigator = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    return (<Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
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
        headerTitleAlign: 'center',
        tabBarActiveTintColor: 'tomato',
        headerStyle: {
            backgroundColor: theme.headerBottom,
        },
        tabBarStyle: {
            backgroundColor: theme.headerBottom,
        },
    })}
    >
        <Tab.Screen name="Activities" component={InfoDisplayScreen}/>
        <Tab.Screen name="Diet" component={InfoDisplayScreen}/>
        <Tab.Screen name="Settings" component={SettingsScreen}/>
    </Tab.Navigator>);
}

/**
 * Navigation component that sets up the stack navigation.
 * It includes the home screen (which contains the bottom tab navigator) and an entry screen for adding new entries.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const Navigation = () => {
    const [itemList, setItemList] = useState([]);
    const {theme, toggleTheme} = useContext(ThemeContext);
    return (
        <ItemContext.Provider value={{itemList, setItemList}}>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={BottomTabNavigator} options={{
                    headerShown: false,
                }}/>
                <Stack.Screen name="Entry" component={EntryScreen} options={
                    ({route}) => {
                        const {type, item} = route.params || {};
                        let title = '';
                        if (item) {
                            title = 'Edit'
                        } else if (type === 'activity') {
                            title = 'Add Activity';
                        } else if (type === 'diet') {
                            title = 'Add Diet';
                        }
                        return {
                            title,
                            headerTitleAlign: 'center',
                            headerStyle: {
                                backgroundColor: theme.headerBottom,
                            },
                        };
                    }}/>
            </Stack.Navigator>
        </ItemContext.Provider>);
}