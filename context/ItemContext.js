/**
 * File Explanation
 * `ItemContext.js` is a JavaScript file that defines the `ItemContext` for a React Native application.
 * This context is used to manage the state of items (activities or diet entries) across the application.
 * It provides a way to share the item list and a function to update the list with any component that consumes this context.
 */

import { createContext } from "react";

export const ItemContext = createContext();