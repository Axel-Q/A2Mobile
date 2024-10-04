import React, {useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import InfoDisplayScreen from "../screens/InfoDisplayScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import {SettingsScreen} from "../screens/SettingsScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import {EntryScreen} from "../screens/EntryScreen";
import {} from "../helperFile/Theme";
import {ItemContext} from "../context/ItemContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const BottomTabNavigator = () => {
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
    })}
    >
        <Tab.Screen name="Activities" component={InfoDisplayScreen}/>
        <Tab.Screen name="Diet" component={InfoDisplayScreen}/>
        <Tab.Screen name="Settings" component={SettingsScreen}/>
    </Tab.Navigator>);
}

export const Navigation = () => {
    const [itemList, setItemList] = useState([]);
    return (
        <ItemContext.Provider value={{itemList, setItemList}}>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={BottomTabNavigator} options={{
                    headerShown: false,
                }}/>
                <Stack.Screen name="Entry" component={EntryScreen} options={
                    ({route}) => ({
                        title:
                            route.params?.type === 'activity'
                                ? 'Add an Activity'
                                : 'Add A Diet Entry',
                    })}/>
            </Stack.Navigator>
        </ItemContext.Provider>);

}