import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import {View, Text, StatusBar, StyleSheet, Button, SafeAreaView} from "react-native";
import {myStyle} from "../helperFile/myStyle";
import {ItemsList} from "../components/ItemsList";
import {useState, useEffect} from "react";
import {useRoute} from "@react-navigation/native";
import {log} from "expo/build/devtools/logger";

const InfoDisplayScreen = ({navigation, route}) => {

    useEffect(() => {
    console.log('Updated itemList:', itemList);
}, [itemList]);


    const [itemList, setItemList] = useState([]);
    const handleAdd = (newEvent, EventTime, durationOrMin) => {
        const newItem = {id:Date.now(), title: newEvent, time: EventTime, duration: durationOrMin};
        setItemList((prevItemList) => [...prevItemList, newItem]);
    };

    navigation.setOptions({
        headerRight: () => (
            <View>
                <Button title="Add" onPress={() => navigation.navigate('Entry', {handleAdd})}/>
            </View>
        ),
    });

    return (
        <SafeAreaView>
            <View>
                <Text>Activities</Text>
                <ItemsList itemList={itemList} type={'activity'}/>
            </View>
        </SafeAreaView>
    );
}

export default InfoDisplayScreen;

