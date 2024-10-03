import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import {View, Text, StatusBar, StyleSheet} from "react-native";
import {myStyle} from "../helperFile/myStyle";


const ActivitiesScreen = () => {
    return (
        <View style={myStyle.homePageContainer}>
            <Text>Activities</Text>
            <Feather name="activity" size={24} color="black"/>
            <Ionicons name="fast-food-outline" size={24} color="black"/>
        </View>
    );
}

export default ActivitiesScreen;

