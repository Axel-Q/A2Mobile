/**
 * File Explanation
 * `CustomizedDatePicker.js` is a JavaScript file that defines the `CustomizedDatePicker` component for a React Native application.
 * This component provides a date picker input field that allows users to select a date.
 * It uses the `DateTimePicker` component from `@react-native-community/datetimepicker` to display the date picker.
 * The selected date is passed back to the parent component through a callback function.
 */


import React, { useState } from 'react';
import { View, TextInput, Button, Platform } from 'react-native';
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
export default function CustomizedDatePicker({ selectedDate, onDateSelect }) {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleDateChange = (event, newDate) => {
    const pickedDate = newDate || selectedDate;
    setPickerVisible(Platform.OS === 'ios'); // Keep picker open for iOS only
    onDateSelect(pickedDate); // Callback for parent component
  };

  const openDatePicker = () => {
    setPickerVisible(true);
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}
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
        <Button title="Done" onPress={() => setPickerVisible(false)} />
      )}
    </View>
  );
}