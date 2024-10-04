import React from "react";
import {useNavigation} from "@react-navigation/native";
import {Dimensions, FlatList, TouchableOpacity, View} from "react-native";
import {myStyle} from "../helperFile/myStyle";
import {Text} from "react-native";

export const ItemsList = ({itemList, type, handleAdd}) => {
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

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("Entry", {item: serializableItem, type, handleAdd})}
            >
                <View style={[myStyle.EachItemContainer, {width: width * 0.85}]}>
                    {type === 'activity' ? (
                        <>
                            <Text style={myStyle.EachItemText}>{item.title}</Text>
                            <Text style={myStyle.EachItemDate}>{new Date(item.time).toDateString()}</Text>
                            <Text style={myStyle.EachItemDuration}>{item.duration} Min</Text>
                        </>
                    ) : (
                        <>
                            <Text style={myStyle.EachItemText}>{item.description}</Text>
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