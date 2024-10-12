/**
 * `EntryScreen.js` is a JavaScript file that defines the `EntryScreen` component for a React Native application.
 * This screen allows users to add or edit entries for activities or diet.
 * It includes form fields for selecting an activity, entering duration, description, calories, and a date picker.
 * The component uses context to manage the list of items and updates the list upon form submission.
 */

import {myStyle} from "../helperFile/myStyle";
import {View, Text, TextInput, Button, Alert, FlatList, TouchableWithoutFeedback, Keyboard} from "react-native";
import {useContext, useEffect, useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {useNavigation, useTheme} from "@react-navigation/native";
import CustomizedDatePicker from "../components/CustomizedDatePicker";
import {ItemContext} from "../context/ItemContext";

/**
 * EntryScreen component that allows users to add or edit entries for activities or diet.
 *
 * @param {object} props - The component props.
 * @param {object} props.navigation - The navigation object provided by React Navigation.
 * @param {object} props.route - The route object provided by React Navigation.
 * @returns {JSX.Element} The rendered component.
 */
export const EntryScreen = ({navigation, route}) => {
    const {itemList, setItemList} = useContext(ItemContext);
    const {type, item} = route.params;

    // Convert date strings back to Date objects
    const initialDate = item ? item.date ? new Date(item.date) : item.time ? new Date(item.time) : null : null;
    const [date, setDate] = useState(initialDate);
    const [duration, setDuration] = useState(item && item.duration ? item.duration.toString() : '');
    const [activityValue, setActivityValue] = useState(item ? item.title : null);
    const [description, setDescription] = useState(item ? item.description : '');
    const [calories, setCalories] = useState(item && item.calories ? item.calories.toString() : '');
    const [items, setItems] = useState([
        {label: 'Running', value: 'running'},
        {label: 'Walking', value: 'walking'},
        {label: 'Swimming', value: 'swimming'},
        {label: 'Weights', value: 'weights'},
        {label: 'Yoga', value: 'yoga'},
        {label: 'Hiking', value: 'hiking'},
    ]);
    const [open, setOpen] = useState(false);
    // Regex pattern for number validation (positive integers or decimals)
    // Helper function for validating numbers (both duration and calories)
    const validateNumber = (value, fieldName) => {
        const numberRegex = /^\d+(\.\d+)?$/;
        if (!numberRegex.test(value)) {
            Alert.alert('Error', `Please enter a valid ${fieldName} (positive number).`);
            return false;
        }

        const parsedValue = parseFloat(value);
        if (parsedValue <= 0) {
            Alert.alert('Error', `Please enter a valid ${fieldName} (positive number greater than 0).`);
            return false;
        }

        return true;
    };

    const handleAdd = (itemData) => {
        const {id, type} = itemData;
        let newItem = {id: id || Date.now(), type};

        if (type === 'activity') {
            newItem = {
                ...newItem,
                title: itemData.title,
                time: itemData.time instanceof Date ? itemData.time : new Date(itemData.time),
                duration: itemData.duration,
            };
        } else if (type === 'diet') {
            newItem = {
                ...newItem,
                description: itemData.description,
                date: itemData.date instanceof Date ? itemData.date : new Date(itemData.date),
                calories: itemData.calories,
            };
        }

        setItemList((prevItemList) => {
            if (id) {
                return prevItemList.map((item) => (item.id === id ? newItem : item));
            } else {
                return [...prevItemList, newItem];
            }
        });
    };

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

            // Validate duration
            if (!validateNumber(duration, 'duration')) {
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

            // Validate calories
            if (!validateNumber(calories, 'calories')) {
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


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
                <View style={{padding: 16}}>
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
                        <Button title="To Save" onPress={onSubmit}/>
                        <Button title={"Cancel"} onPress={() => navigation.navigate('Home')}/>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}