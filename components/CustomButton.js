// CustomButton.js

import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

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