import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, FlatList, TouchableOpacity, View, Text } from "react-native";
import { myStyle } from "../helperFile/myStyle";
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemeContext } from "../context/Theme";

/**
 * ItemsList component that displays a list of items (activities or diet entries).
 *
 * @param {object} props - The component props.
 * @param {Array} props.itemList - The list of items to display.
 * @param {string} props.type - The type of items ('activity' or 'diet').
 * @returns {JSX.Element} The rendered component.
 */
export const ItemsList = ({ itemList, type }) => {
  const { width } = Dimensions.get('window');
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  console.log('ItemsList received itemList:', itemList);

  // Helper functions
  const getISOString = (value) => {
    if (!value) return undefined;

    if (value instanceof Date) {
      return value.toISOString();
    } else if (typeof value.toDate === 'function') {
      return value.toDate().toISOString();
    } else if (typeof value === 'string') {
      const date = new Date(value);
      return !isNaN(date.getTime()) ? date.toISOString() : undefined;
    } else {
      return undefined;
    }
  };

  const formatDate = (value) => {
    if (!value) return 'No Date';

    let date;

    if (value instanceof Date) {
      date = value;
    } else if (typeof value.toDate === 'function') {
      date = value.toDate();
    } else if (typeof value === 'string') {
      date = new Date(value);
    } else {
      return 'Invalid Date';
    }

    return !isNaN(date.getTime()) ? date.toDateString() : 'Invalid Date';
  };

  // renderItem function
  const renderItem = ({ item }) => {
    // Create a serializable copy of the item
    const serializableItem = {
      ...item,
      date: getISOString(item.date),
      time: getISOString(item.time),
    };

    // Check conditions for displaying the special icon
    const showIcon = (item.isSpecial && !item.isChecked)

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Entry", { item: serializableItem, type })}
      >
        <View style={[myStyle.EachItemContainer, { width: width * 0.85 }, { backgroundColor: theme.itermColor }]}>
          {type === 'activity' ? (
            <>
              <Text style={myStyle.EachItemText}>{item.title}</Text>
              {/* Show icon if the conditions are met */}
              {showIcon && <AntDesign name={'warning'} size={24} color={'red'} />}
              <Text style={myStyle.EachItemDate}>{formatDate(item.time)}</Text>
              <Text style={myStyle.EachItemDuration}>{item.duration} Min</Text>
            </>
          ) : (
            <>
              <Text style={myStyle.EachItemText}>{item.description}</Text>
              {showIcon && <AntDesign name={'warning'} size={24} color={'red'} />}
              <Text style={myStyle.EachItemDate}>{formatDate(item.date)}</Text>
              <Text style={myStyle.EachItemDuration}>{item.calories} Calories</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Return statement for the ItemsList component
  return (
    <FlatList
      data={itemList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={myStyle.ItemDisplayContainer}
    />
  );
};