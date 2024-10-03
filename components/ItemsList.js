import React from "react";
import {useNavigation} from "@react-navigation/native";
import {FlatList, TouchableOpacity} from "react-native";
import {myStyle} from "../helperFile/myStyle";

export const ItemsList = ({item, type}) => {
    const navigation = useNavigation()

    const renderItem = ({item}) => (
        <TouchableOpacity
            style={myStyle.item}>
            <Text style={myStyle.title}>{item.title}</Text>
        </TouchableOpacity>
    )
    return (
        <FlatList data={item} renderItem={renderItem} keyExtractor={(item) => item.id.toString()}/>
    )
}