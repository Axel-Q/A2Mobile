import {myStyle} from "../helperFile/myStyle";
import {View, Text, TextInput, Button, Alert, FlatList} from "react-native";
import {useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {useNavigation} from "@react-navigation/native";
import CustomizedDatePicker from "../components/CustomizedDatePicker";

export const EntryScreen = ({navigation, route}) => {
    const [date, setDate] = useState(null);
    const [duration, setDuration] = useState(null);
    const [value, setValue] = useState(null);
    // State variables for DropDownPicker
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {label: "Walking", value: "Walking"},
        {label: "Running", value: "Running"},
        {label: "Swimming", value: "Swimming"},
        {label: "Weights", value: "Weights"},
        {label: "Yoga", value: "Yoga"},
        {label: "Hike", value: "Hike"},
        {label: "Camping", value: "Camping"},
    ]);

 const onSubmit = () => {
    if (!value) {
        Alert.alert('Error', 'Please select an activity.');
        return;
    }

    if (!duration || isNaN(duration)) {
        Alert.alert('Error', 'Please enter a valid duration.');
        return;
    }

    if (!date) {
        Alert.alert('Error', 'Please select a date.');
        return;
    }

    // If all validations pass, navigate to InfoDisplay screen
    navigation.navigate('InfoDisplayScreen', {
        newItemTitle: value,
        duration: duration,
        date: date.toLocaleDateString(),
    });
};


    return (
        <View>
            <Text style={{textAlign: 'left'}}>Activity *</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                containerStyle={myStyle.datePickerContainer}
                placeholder="Select an activity"
            />

            <Text style={{textAlign: 'left'}}>Duration (min)*</Text>
            <TextInput
                placeholder="Duration"
                onChangeText={setDuration}
                value={duration}
                keyboardType={"number-pad"}
                style={{
                    borderWidth: 1,         // Defines the thickness of the border
                    borderColor: 'gray',     // Defines the color of the border
                    borderRadius: 5,         // Optional: rounds the corners of the border
                    padding: 10,             // Adds some padding inside the input field
                }}>
            </TextInput>

            <Text style={{textAlign: 'left'}}>Date *</Text>
            <CustomizedDatePicker selectedDate={date} onDateSelect={setDate}/>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button title="Add Item" onPress={onSubmit}/>
                <Button title={"Cancel"} onPress={() => navigation.navigate('Home')}/>
            </View>
        </View>
    );
}