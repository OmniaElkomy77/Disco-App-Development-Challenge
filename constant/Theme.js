// Importing Dimensions module from 'react-native' to get the screen dimensions
import { Dimensions } from 'react-native'

// Extracting width and height from the window dimensions
const { width, height } = Dimensions.get("window")

// Object containing various color values used in the application
export const App_Colors = {
    primary: "#0052CC",         // Primary color
    white: "#fff",              // White color
    black: "#000",              // Black color
    red: "#E5233D",             // Red color
    green: "#59BA47",           // Green color
    yallow: "#FFC828",          // Yellow color
    light_blue: "#33c2E3",      // Light blue color
    gray: "#999",               // Gray color
    light_gray: "#dadce0",      // Light gray color
    dark_gray: "#7F7F7F"         // Dark gray color
}

// Object containing the width and height of the screen
export const App_Size = {
    width,                       // Screen width
    height                      // Screen height
}

// Object containing the theme of the application with color and size configurations
const Theme = { App_Colors, App_Size }

// Exporting the Theme object as the default export
export default Theme;
