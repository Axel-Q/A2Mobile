import {myStyle} from "../helperFile/myStyle";
import {View, Text, TextInput, Button, Alert, FlatList} from "react-native";
import {useEffect, useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {useNavigation, useTheme} from "@react-navigation/native";
import CustomizedDatePicker from "../components/CustomizedDatePicker";

export const EntryScreen = ({navigation, route}) => {
    const {handleAdd, type, item} = route.params;

    // for activity
    // Convert date strings back to Date objects
    const initialDate = item ? item.date ? new Date(item.date) : item.time ? new Date(item.time) : null : null;
    const [date, setDate] = useState(initialDate);
    const [duration, setDuration] = useState(item && item.duration ? item.duration.toString() : '');
    const [activityValue, setActivityValue] = useState(item ? item.title : null);
    const [items, setItems] = useState([{label: 'Running', value: 'running'}, {
        label: 'Cycling', value: 'cycling'
    }, {label: 'Swimming', value: 'swimming'}, {label: 'Walking', value: 'walking'}, {
        label: 'Weights', value: 'weights'
    }, {label: 'Yoga', value: 'yoga'}, {label: 'Hiking', value: 'hiking'}]);
    // for diet
    const [description, setDescription] = useState(item ? item.description : '');
    const [calories, setCalories] = useState(item && item.calories ? item.calories.toString() : '');
    const [open, setOpen] = useState(false);


    const onSubmit = () => {
        if (!date) {
            Alert.alert('Error', 'Please select a date.');
            return;
        }

        if (type === 'activity') {
            if (!activityValue) {
                Alert.alert('Error', 'Please select an activity.');
                return;
            }

            // Ensure duration is a number and greater than 0
            const parsedDuration = parseFloat(duration);
            if (!duration || isNaN(parsedDuration) || parsedDuration <= 0) {
                Alert.alert('Error', 'Please enter a valid duration (positive number).');
                return;
            }

            handleAdd({
                id: item ? item.id : null,
                type: 'activity',
                title: activityValue,
                time: date,
                duration: parseFloat(duration),
            });
        } else if (type === 'diet') {
            if (!description) {
                Alert.alert('Error', 'Please enter a description.');
                return;
            }

            // Ensure calories is a number and greater than 0
            const parsedCalories = parseFloat(calories);
            if (!calories || isNaN(parsedCalories) || parsedCalories <= 0) {
                Alert.alert('Error', 'Please enter valid calories (positive number).');
                return;
            }

            handleAdd({
                id: item ? item.id : null,
                type: 'diet',
                description: description.trim(),
                date: date,
                calories: parseFloat(calories),
            });
        }

        navigation.goBack();
    };


    return (<View style={{padding: 16}}>
        {type === 'activity' ? (<>
            {/* Activity Form */}
            <Text style={{textAlign: 'left', marginBottom: 8}}>Activity *</Text>
            <DropDownPicker
                open={open}
                value={activityValue}
                items={items}
                setOpen={setOpen}
                setValue={setActivityValue}
                setItems={setItems}
                containerStyle={{marginBottom: 16}}
            />

            <Text style={{textAlign: 'left', marginBottom: 8}}>Duration (min) *</Text>
            <TextInput
                onChangeText={setDuration}
                value={duration}
                keyboardType="number-pad"
                style={{
                    borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginBottom: 16,
                }}
            />
        </>) : (<>
            {/* Diet Form */}
            <Text style={{textAlign: 'left', marginBottom: 8}}>Description *</Text>
            <TextInput
                onChangeText={setDescription}
                value={description}
                numberOfLines={4}
                style={{
                    borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginBottom: 16,
                }}
            />

            <Text style={{textAlign: 'left', marginBottom: 8}}>Calories *</Text>
            <TextInput
                onChangeText={setCalories}
                value={calories}
                keyboardType="number-pad"
                style={{
                    borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginBottom: 16,
                }}
            />
        </>)}
        {/* Common Date Picker */}
        <Text style={{textAlign: 'left', marginBottom: 8}}>Date *</Text>
        <CustomizedDatePicker selectedDate={date} onDateSelect={setDate}/>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 220}}>
            <Button title="Add Item" onPress={onSubmit}/>
            <Button title={"Cancel"} onPress={() => navigation.navigate('Home')}/>
        </View>
    </View>);
}