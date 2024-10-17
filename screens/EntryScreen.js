/**
 * `EntryScreen.js` is a JavaScript file that defines the `EntryScreen` component for a React Native application.
 * This screen allows users to add or edit entries for activities or diet.
 * It includes form fields for selecting an activity, entering duration, description, calories, and a date picker.
 * The component uses context to manage the list of items and updates the list upon form submission.
 */

import {myStyle} from "../helperFile/myStyle";
import {View, Text, TextInput, Button, Alert, FlatList, TouchableWithoutFeedback, Keyboard} from "react-native";
import {useContext, useEffect, useState, useRef} from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {useNavigation, useTheme} from "@react-navigation/native";
import CustomizedDatePicker from "../components/CustomizedDatePicker";
import {ItemContext} from "../context/ItemContext";
import {addItem, updateItem, deleteItem} from "../firebase/firebaseHelper";
import AntDesign from '@expo/vector-icons/AntDesign';
import Checkbox from 'expo-checkbox';

/**
 * EntryScreen component that allows users to add or edit entries for activities or diet.
 *
 * @param {object} props - The component props.
 * @param {object} props.navigation - The navigation object provided by React Navigation.
 * @param {object} props.route - The route object provided by React Navigation.
 * @returns {JSX.Element} The rendered component.
 */
export const EntryScreen = ({navigation, route}) => {
    const {type, item} = route.params;
    const durationInputRef = useRef(null);
    const caloriesInputRef = useRef(null);
    const descriptionInputRef = useRef(null);


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
        {label: 'Cycling', value: 'cycling'},
        {label: 'Hiking', value: 'hiking'},
    ]);
    const [open, setOpen] = useState(false);
    const [isPickerVisible, setDatePickerVisible] = useState(false);
    // Regex pattern for number validation (positive integers or decimals)
    // Helper function for validating numbers (both duration and calories)
    const validateNumber = (value, fieldName, inputRef) => {
        const numberRegex = /^\d+(\.\d+)?$/;
        if (!numberRegex.test(value)) {
            Alert.alert(
                'Invalid Input',
                `Please enter a valid ${fieldName} (positive number).`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            if (inputRef && inputRef.current) {
                                inputRef.current.focus();
                            }
                        },
                    },
                ],
                {cancelable: false}
            );
            return false;
        }

        const parsedValue = parseFloat(value);
        if (parsedValue <= 0) {
            Alert.alert(
                'Invalid Input',
                `Please enter a valid ${fieldName} (positive number greater than 0).`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            if (inputRef && inputRef.current) {
                                inputRef.current.focus();
                            }
                        },
                    },
                ],
                {cancelable: false}
            );
            return false;
        }

        return true;
    };

    const handleAdd = async (itemData) => {
        const {id, type} = itemData;
        let newItem = {type};

        if (type === 'activity') {
            newItem = {
                ...newItem,
                title: itemData.title,
                time: itemData.time,
                duration: itemData.duration,
            };
        } else if (type === 'diet') {
            newItem = {
                ...newItem,
                description: itemData.description,
                date: itemData.date,
                calories: itemData.calories,
            };
        }

        try {
            if (id) {
                newItem.id = id; // Ensure the ID is included
                await updateItem(type, newItem);
            } else {
                const addedItem = await addItem(type, newItem);
                newItem.id = addedItem.id; // Capture the new ID
            }
        } catch (e) {
            console.error('Error adding/updating item: ', e);
        }
    };

    const onSubmit = () => {
        if (!date) {
            Alert.alert(
                "Missing Date",
                "Please select a date.",
                [{text: "OK"}],
                {cancelable: false}
            );
            return;
        }

        if (type === "activity") {
            if (!activityValue) {
                Alert.alert(
                    "Missing Activity",
                    "Please select an activity.",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                setOpen(true); // Open the DropDownPicker
                            },
                        },
                    ],
                    {cancelable: false}
                );
                return;
            }

            // Validate duration
            if (!validateNumber(duration, "duration", durationInputRef)) {
                return;
            }
            handleAdd({
                id: item ? item.id : null,
                type: "activity",
                title: activityValue,
                time: date,
                duration: parseFloat(duration),
            });
        } else if (type === "diet") {
            if (!description) {
                Alert.alert(
                    "Missing Description",
                    "Please enter a description.",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                if (descriptionInputRef && descriptionInputRef.current) {
                                    descriptionInputRef.current.focus();
                                }
                            },
                        },
                    ],
                    {cancelable: false}
                );
                return;
            }

            // Validate calories
            if (!validateNumber(calories, "calories", caloriesInputRef)) {
                return;
            }

            handleAdd({
                id: item ? item.id : null,
                type: "diet",
                description: description.trim(),
                date: date,
                calories: parseFloat(calories),
            });
        }

        navigation.goBack();
    };

    // Function to handle opening the date picker
    const onOpenDatePicker = () => {
        setDatePickerVisible(true);
        // Blur any focused TextInput
        if (durationInputRef.current) durationInputRef.current.blur();
        if (descriptionInputRef.current) descriptionInputRef.current.blur();
        if (caloriesInputRef.current) caloriesInputRef.current.blur();
        // Close DropDownPicker
        setOpen(false);
    };
    useEffect(() => {
        if (item) {
            navigation.setOptions({
                headerRight: () => (
                    <AntDesign
                        name="delete"
                        size={24}
                        color="black"
                        onPress={() => {deleteItem(type, item); navigation.goBack();
                        }}
                    />
                ),
            });
        }
    }, [navigation, item]);

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
                            setOpen={(value) => {
                                setOpen(value);
                                if (value) {
                                    // DropDownPicker is opening
                                    // Blur any focused TextInput
                                    if (durationInputRef.current) durationInputRef.current.blur();
                                    if (descriptionInputRef.current) descriptionInputRef.current.blur();
                                    if (caloriesInputRef.current) caloriesInputRef.current.blur();
                                    // Close DatePicker
                                    setDatePickerVisible(false);
                                }
                            }}
                            setValue={setActivityValue}
                            setItems={setItems}
                            containerStyle={{marginBottom: 16}}
                        />

                        <Text style={{textAlign: 'left', marginBottom: 8}}>Duration (min) *</Text>
                        <TextInput
                            ref={durationInputRef}
                            onChangeText={setDuration}
                            value={duration}
                            keyboardType="number-pad"
                            onFocus={() => {
                                setOpen(false);
                                setDatePickerVisible(false);
                            }}
                            style={{
                                borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginBottom: 16,
                            }}
                        />
                    </>) : (<>
                        {/* Diet Form */}
                        <Text style={{textAlign: 'left', marginBottom: 8}}>Description *</Text>
                        <TextInput
                            ref={descriptionInputRef}
                            onChangeText={setDescription}
                            value={description}
                            numberOfLines={4}
                            onFocus={() => {
                                setOpen(false);
                                setDatePickerVisible(false);
                            }}
                            style={{
                                borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginBottom: 16,
                            }}
                        />

                        <Text style={{textAlign: 'left', marginBottom: 8}}>Calories *</Text>
                        <TextInput
                            ref={caloriesInputRef}
                            onChangeText={setCalories}
                            value={calories}
                            keyboardType="number-pad"
                            onFocus={() => {
                                setOpen(false);
                                setDatePickerVisible(false);
                            }}
                            style={{
                                borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginBottom: 16,
                            }}
                        />
                    </>)}
                    {/* Common Date Picker */}
                    <Text style={{textAlign: 'left', marginBottom: 8}}>Date *</Text>
                    <CustomizedDatePicker selectedDate={date} onDateSelect={setDate}
                                          isPickerVisible={isPickerVisible}
                                          setPickerVisible={setDatePickerVisible}
                                          onOpenDatePicker={onOpenDatePicker}/>
                    <Text>This Item is marked as special. Select the checkbox if would like to approve it</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 220}}>

                        <Button title={"Cancel"} onPress={() => navigation.navigate('Home')}/>
                        <Button title="To Save" onPress={onSubmit}/>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}