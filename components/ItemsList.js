import React from "react";
import {useNavigation} from "@react-navigation/native";
import {FlatList, TouchableOpacity} from "react-native";
import {myStyle} from "../helperFile/myStyle";
import {Text} from "react-native";

export const ItemsList = ({itemList, type}) => {

    const renderItem = ({item}) => (
        <TouchableOpacity
            style={myStyle.item}>
            <Text style={myStyle.title}>{item.title}</Text>
        </TouchableOpacity>
    )
    return (
        <FlatList data={itemList} renderItem={renderItem} keyExtractor={(item) => item.id.toString()}/>
    )
}