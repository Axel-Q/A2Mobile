import {View, Text, StatusBar, StyleSheet, Button, SafeAreaView, TouchableOpacity} from "react-native";
import {ItemsList} from "../components/ItemsList";
import React, { useState, useEffect, createContext, useContext } from "react";
import {ItemContext} from "../context/ItemContext";
import {ThemeContext, ThemeProvider} from '../context/Theme';


const InfoDisplayScreen = ({navigation, route}) => {
    const {itemList} = useContext(ItemContext);
    const type = route.name === 'Activities' ? 'activity' : 'diet';
    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        console.log('Updated itemList:', itemList);
    }, [itemList]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View>
                    <Button
                        title="Add"
                        onPress={() => navigation.navigate('Entry', {type})}
                    />
                </View>
            ),
        });
    }, [navigation, type]);
    // Filter items based on the current type (activity or diet)
    const filteredItemList = itemList.filter(item => item.type === type);
    return (<SafeAreaView>
        <View >
            <ItemsList itemList={filteredItemList} type={type}/>
        </View>
    </SafeAreaView>);
}

export default InfoDisplayScreen;

