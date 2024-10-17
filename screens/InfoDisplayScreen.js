import {View, Text, StatusBar, StyleSheet, Button, SafeAreaView, TouchableOpacity} from "react-native";
import {ItemsList} from "../components/ItemsList";
import React, {useState, useEffect, createContext, useContext} from "react";
import {ItemContext} from "../context/ItemContext";
import {ThemeContext, ThemeProvider} from '../context/Theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

/**
 * InfoDisplayScreen component displays a list of items filtered by type (activity or diet).
 * It uses context to access the item list and theme, and sets up navigation options.
 *
 * @param {object} props - The component props.
 * @param {object} props.navigation - The navigation object provided by React Navigation.
 * @param {object} props.route - The route object provided by React Navigation.
 * @returns {JSX.Element} The rendered component.
 */
const InfoDisplayScreen = ({navigation, route}) => {
    const {itemList} = useContext(ItemContext);
    const type = route.name === 'Activities' ? 'activity' : 'diet';
    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        console.log('Updated itemList:', itemList);
    }, [itemList]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                let IconComponent;
                let iconName;

                if (route.name === 'Activities') {
                    IconComponent = Feather;
                    iconName = 'activity';
                } else if (route.name === 'Diet') {
                    IconComponent = Ionicons;
                    iconName = 'fast-food-outline';
                }
                return (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Entry', {type})}
                        style={{marginRight: 15}}>
                        <View style={{flexDirection: 'row'}}>
                            <AntDesign name={'plus'} size={24} style={{marginRight: 2}}/>
                            <IconComponent name={iconName} size={24}/>
                        </View>
                    </TouchableOpacity>

                );
            },
        });
    }, [navigation, route.name, type, theme]);
    // Filter items based on the current type (activity or diet)
    const filteredItemList = itemList.filter(item => item.type === type);
    return (<SafeAreaView>
        <View>
            <ItemsList itemList={filteredItemList} type={type}/>
        </View>
    </SafeAreaView>);
}

export default InfoDisplayScreen;

