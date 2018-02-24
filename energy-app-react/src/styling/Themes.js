/* Themes.js
 * Written by Liv Phillips for Energy App Comps, 2018
 * Change between global themes without having to change every file.
 */
// import colorfulTheme from "./ColorfulTheme";
import defaultTheme from "./DefaultTheme";
// import font from "./DefaultTheme";

// console.log(defaultTheme)

export function GetStyle() {
    theme = defaultTheme["DefaultTheme"];
    theme.font = defaultTheme.font;
    theme.fontFamily = defaultTheme.fontFamily;
    theme.boldFont = defaultTheme.boldFont;
    // console.log(theme)
    return theme;
    // if (name=='bland') {
    //     return defaultTheme;
    // } else if (name=='colorful') {
    //     return colorfulTheme;
    // }
}
