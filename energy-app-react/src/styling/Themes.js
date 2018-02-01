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
