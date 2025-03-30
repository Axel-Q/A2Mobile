/**
* CustomButton component is a reusable component that can be used to create buttons with custom styles.
* It accepts props for onPress, title, backgroundColor, pressedColor, textColor, and style.
* The component uses Pressable to create a button that changes color when pressed.
* The button's background color changes to pressedColor when pressed and returns to backgroundColor when released.
*/

import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';


/**
* CustomButton component that creates a button with custom styles.
*
* @param {object} props - The component props.
* @param {function} props.onPress - The function to call when the button is pressed.
* @param {string} props.title - The text to display on the button.
* @param {string} [props.backgroundColor='blue'] - The background color of the button.
* @param {string} [props.pressedColor='#0000cc'] - The background color of the button when pressed.
* @param {string} [props.textColor='white'] - The text color of the button.
* @param {object} [props.style] - Additional styles to apply to the button.
* @returns {JSX.Element} A custom-styled
 */
const CustomButton = ({
                          onPress,
                          title,
                          backgroundColor = 'blue',
                          pressedColor = '#0000cc',
                          textColor = 'white',
                          style,
                      }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({pressed}) => [
                styles.button,
                {backgroundColor: pressed ? pressedColor : backgroundColor},
                style,
            ]}
        >
            <Text style={[styles.text, {color: textColor}]}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default CustomButton;