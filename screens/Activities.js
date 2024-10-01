import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import {View, Text, StatusBar, StyleSheet} from "react-native";


const Activities = () => {
    return (
        <View style={styles.container}>
            <Text>Activities</Text>
            <Feather name="activity" size={24} color="black"/>
            <Ionicons name="fast-food-outline" size={24} color="black"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default Activities;

