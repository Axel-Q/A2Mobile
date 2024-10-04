import React from "react";
import {useNavigation} from "@react-navigation/native";
import {Dimensions, FlatList, TouchableOpacity, View} from "react-native";
import {myStyle} from "../helperFile/myStyle";
import {Text} from "react-native";

export const ItemsList = ({itemList, type}) => {
    const {width} = Dimensions.get('window');
    const navigation = useNavigation();
    console.log('ItemsList received itemList:', itemList);
    const renderItem = ({item}) => (<TouchableOpacity onPress={() => navigation.navigate("Entry", {item, type})}>
        <View style={[myStyle.EachItemContainer, {width: width * 0.85}]}>
            <Text style={myStyle.EachItemText}>{item.title}</Text>
            <Text style={myStyle.EachItemDate}>{new Date(item.time).toDateString()}</Text>
            <Text style={myStyle.EachItemDuration}>{item.duration} Min</Text>

        </View>
    </TouchableOpacity>)
    return (<FlatList data={itemList} renderItem={renderItem}
                      keyExtractor={(item) => item.id}
                      contentContainerStyle={myStyle.ItemDisplayContainer}/>)
}