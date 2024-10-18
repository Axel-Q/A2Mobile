/**
 * File Explanation
 * `reusableColor.js` is a JavaScript file that defines a set of reusable color constants for a React Native application.
 * These colors are used throughout the application for styling various components and elements.
 * The colors are defined as properties of an object and exported for use in other parts of the application.
 */

export const reusableColor = {
  // Basic Colors
  white: '#ffffff',
  black: '#000000',
  gray: 'gray',

  // Application Specific Colors
  background: '#fff',          // Used in homePageContainer background
  primary: '#4b3f72',          // Used in item backgroundColor
  secondary: '#009783',        // Used in headerStyle backgroundColor
  accent: 'tomato',            // Used in tabBarActiveTintColor
  inactiveTint: 'gray',        // Used in tabBarInactiveTintColor

  // Text Colors
  textPrimary: '#ffffff',      // Used in title color
  textSecondary: 'white',      // Used in EachItemText color

  // Additional Colors
  itemBackground: '#4b3f72',   // Same as primary, but can be separated if needed
  borderColor: 'gray',         // Used in borders
  red: 'red',
};