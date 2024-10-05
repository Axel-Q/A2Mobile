import React from "react";
import {useNavigation} from "@react-navigation/native";
import {Dimensions, FlatList, TouchableOpacity, View} from "react-native";
import {myStyle} from "../helperFile/myStyle";
import {Text} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export const ItemsList = ({itemList, type}) => {
    const {width} = Dimensions.get('window');

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
                <View style={[myStyle.EachItemContainer, {width: width * 0.85}]}>
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