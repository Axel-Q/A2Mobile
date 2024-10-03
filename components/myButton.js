import {myStyle} from "../helperFile/myStyle";
import {View, Text, Pressable} from "react-native";
import {ThemeProvider} from "../helperFile/Theme";

export const myButton = ({title, bgcolor, pressedFunction}) => {
    return (
        <Pressable onPress={pressedFunction} style={({pressed}) => [
            myStyle.button,
            {backgroundColor: pressed ? 'rgb(170,12,52)' : bgcolor},
            {borderColor: pressed ? 'rgb(16,104,216)' : bgcolor},
        ]}
                   android_ripple={{color: "#fb6363"}}>
            {({pressed}) => (
                <Text
                    style={[
                        myStyle.text,
                    ]}
                >
                    {title}
                </Text>
            )}
        </Pressable>
    );
};