import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import {View, Text, StatusBar} from "react-native";


const Activities = () => {
    return (
        <View>
            <Text>Activities</Text>
            <Feather name="activity" size={24} color="black"/>
            <Ionicons name="fast-food-outline" size={24} color="black"/>
        </View>
    );
}

export default Activities;

