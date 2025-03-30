/**
 * File Explanation
 * `myStyle.js` is a JavaScript file that defines a set of styles for a React Native application.
 * These styles are used to style various components and elements within the application, such as containers, items, titles, buttons, and text.
 * The styles import colors from `reusableColor.js` to maintain consistency across the application.
 */

import {reusableColor} from './ReusableColor';
import {Platform} from "react-native";

export const myStyle = {
    homePageContainer: {
        flex: 1, backgroundColor: reusableColor.background, alignItems: 'center', justifyContent: 'center',
    }, item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        marginVertical: 8,
        borderRadius: 8,
        backgroundColor: reusableColor.primary,
    }, title: {
        fontSize: 16, color: reusableColor.textPrimary, fontWeight: "bold", flex: 1,
    }, BottomTabNavigator: {
        tabBarActiveTintColor: reusableColor.accent, tabBarInactiveTintColor: reusableColor.inactiveTint, headerStyle: {
            backgroundColor: reusableColor.secondary,
        },
    }, button: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 10,
    }, text: {
        fontSize: 16, fontWeight: "bold",
    }, datePickerContainer: {
        height: 40, marginBottom: 20,
    }, ItemDisplayContainer: {
        paddingVertical: 10, alignItems: 'center',
    }, EachItemContainer: {
        padding: 15, flexDirection: 'row', marginVertical: 10, borderRadius: 10,
    }, EachItemText: {
        fontSize: 15, color: reusableColor.textSecondary, marginRight: 10,
    }, EachItemDuration: {
        fontSize: 15, backgroundColor: reusableColor.white, paddingHorizontal: 10,
    }, EachItemDate: {
        fontSize: 15, backgroundColor: reusableColor.white, marginRight: 15, marginLeft: 5,
    }, specialItemContainer: {
        flexDirection: 'row', paddingBottom: 20, alignItems: 'center',
    }, textContainer: {
        flex: 1, marginRight: 10,
    }, specialItemText: {
        ...Platform.select({
            ios: {
                textAlign: 'left',
            }, android: {
                textAlign: 'justify',
            },
        }), lineHeight: 20, color: reusableColor.red
    }, checkboxContainer: {
        width: 24, alignItems: 'center',
    },
};