import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import {View, Text, StatusBar, StyleSheet, Button} from "react-native";
import {myStyle} from "../helperFile/myStyle";
import {ItemList} from "../components/ItemsList";
import {useState} from "react";


const InfoDisplayScreen = ({navigation}) => {
    const[item, setItem] = useState([])
    return (
        <View style={myStyle.homePageContainer}>
            <Text>Activities</Text>
        </View>
    );
}

export default InfoDisplayScreen;

