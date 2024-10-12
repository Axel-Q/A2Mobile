/**
 * EntryScreen component that allows users to add or edit entries for activities or diet.
 *
 * @param {object} props - The component props.
 * @param {object} props.navigation - The navigation object provided by React Navigation.
 * @param {object} props.route - The route object provided by React Navigation.
 * @returns {JSX.Element} The rendered component.
 */

import React, {useContext} from "react";
import {useNavigation} from "@react-navigation/native";
import {Dimensions, FlatList, TouchableOpacity, View} from "react-native";
import {myStyle} from "../helperFile/myStyle";
import {Text} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import {ThemeContext} from "../context/Theme";


/**
 * EntryScreen component that allows users to add or edit entries for activities or diet.
 *
 * @param {object} props - The component props.
 * @param {object} props.navigation - The navigation object provided by React Navigation.
 * @param {object} props.route - The route object provided by React Navigation.
 * @returns {JSX.Element} The rendered component.
 */
export const ItemsList = ({itemList, type}) => {
    const {width} = Dimensions.get('window');
    const {theme} = useContext(ThemeContext);

    const navigation = useNavigation();
    console.log('ItemsList received itemList:', itemList);
    const renderItem = ({item}) => {
        // Create a serializable copy of the item
        const serializableItem = {
            ...item,
            date: item.date ? item.date.toISOString() : undefined,
            time: item.time ? item.time.toISOString() : undefined,
        };

        // Check conditions for displaying the special icon
        const showActivityIcon = (item.title === 'running' || item.title === 'weights') && item.duration > 60;
        const showDietIcon = item.calories && item.calories > 800;
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("Entry", {item: serializableItem, type})}
            >
                <View style={[myStyle.EachItemContainer, {width: width * 0.85}, { backgroundColor: theme.itermColor}]}>
                    {type === 'activity' ? (
                        <>
                            <Text style={myStyle.EachItemText}>{item.title}</Text>
                            {/* Show icon if the conditions are met */}
                            {showActivityIcon && <AntDesign name={'warning'} size={24} color={'red'}/>}
                            <Text style={myStyle.EachItemDate}>{new Date(item.time).toDateString()}</Text>
                            <Text style={myStyle.EachItemDuration}>{item.duration} Min</Text>

                        </>
                    ) : (
                        <>
                            <Text style={myStyle.EachItemText}>{item.description}</Text>
                            {showDietIcon && <AntDesign name={'warning'} size={24} color={'red'}/>}
                            <Text style={myStyle.EachItemDate}>{new Date(item.date).toDateString()}</Text>
                            <Text style={myStyle.EachItemDuration}>{item.calories} Calories</Text>

                        </>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={itemList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={myStyle.ItemDisplayContainer}
        />
    );
};