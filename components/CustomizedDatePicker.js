/**
 * File Explanation
 * `CustomizedDatePicker.js` is a JavaScript file that defines the `CustomizedDatePicker` component for a React Native application.
 * This component provides a date picker input field that allows users to select a date.
 * It uses the `DateTimePicker` component from `@react-native-community/datetimepicker` to display the date picker.
 * The selected date is passed back to the parent component through a callback function.
 */


import React, {useState, useRef} from 'react';
import {View, TextInput, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {myStyle} from "../helperFile/myStyle";


/**
 * CustomizedDatePicker component that provides a date picker input field.
 * It allows users to select a date and passes the selected date back to the parent component.
 *
 * @param {object} props - The component props.
 * @param {Date} props.selectedDate - The currently selected date.
 * @param {function} props.onDateSelect - Callback function to pass the selected date back to the parent component.
 * @returns {JSX.Element} The rendered component.
 */
export default function CustomizedDatePicker({selectedDate, onDateSelect}) {
    const [isPickerVisible, setPickerVisible] = useState(false);
    const textInputRef = useRef(null);

    const handleDateChange = (event, newDate) => {
        if (Platform.OS === 'android') {
            // For Android, check if the event type is 'set' (date selected) or 'dismissed'
            if (event.type === 'set') {
                const pickedDate = newDate || selectedDate;
                onDateSelect(pickedDate);
            }
            setPickerVisible(false); // Close the picker
        } else {
            // For iOS, update the date as the picker is 'inline'
            const pickedDate = newDate || selectedDate;
            onDateSelect(pickedDate);
        }
        // Blur the TextInput to lose focus
        if (textInputRef.current) {
            textInputRef.current.blur();
        }
    };

    const openDatePicker = () => {
        setPickerVisible(true);
    };

    return (
        <View>
            <TextInput
                ref={textInputRef}
                style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 10}}
                placeholder="Select Date"
                value={selectedDate ? selectedDate.toLocaleDateString() : ''}
                onFocus={openDatePicker}
                showSoftInputOnFocus={false} // Prevents keyboard from showing when focused
            />
            {isPickerVisible && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="inline"
                    onChange={handleDateChange}

                />
            )}
            {Platform.OS === 'ios' && isPickerVisible && (
                <Button title="Done" onPress={() => setPickerVisible(false)}/>
            )}
        </View>
    );
}