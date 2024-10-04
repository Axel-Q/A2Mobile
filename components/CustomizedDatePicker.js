import React, { useState } from 'react';
import { View, TextInput, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {myStyle} from "../helperFile/myStyle";

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