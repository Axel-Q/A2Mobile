import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

/**
 * CustomizedDatePicker component that provides a date picker input field.
 * It allows users to select a date and passes the selected date back to the parent component.
 *
 * @param {object} props - The component props.
 * @param {Date} props.selectedDate - The currently selected date.
 * @param {function} props.onDateSelect - Callback function to pass the selected date back to the parent component.
 * @returns {JSX.Element} The rendered component.
 */
export default function CustomizedDatePicker({
                                                 selectedDate,
                                                 onDateSelect,
                                                 isPickerVisible,
                                                 setPickerVisible,
                                                 onOpenDatePicker,
                                             }) {
    const [tempDate, setTempDate] = useState(selectedDate || new Date());

    const handleDateChange = (event, newDate) => {
        if (Platform.OS === 'android') {
            if (event.type === 'set') {
                const pickedDate = newDate || tempDate;
                onDateSelect(pickedDate);
            }
            setPickerVisible(false); // Close the picker
        } else {
            // On iOS, update the temp date as the user scrolls
            setTempDate(newDate || tempDate);
        }
    };

    const onDonePress = () => {
        onDateSelect(tempDate); // Finalize date selection
        setPickerVisible(false);
    };


    return (
        <View>
            <TouchableOpacity onPress={onOpenDatePicker}>
                <View
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{color: selectedDate ? 'black' : 'gray'}}>
                        {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
                    </Text>
                </View>
            </TouchableOpacity>
            {isPickerVisible && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    onChange={handleDateChange}
                />
            )}
            {Platform.OS === 'ios' && isPickerVisible && (
                <Button title="Done" onPress={onDonePress}/>
            )}
        </View>
    );
}