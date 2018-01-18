import colorfulTheme from "./ColorfulTheme";
import defaultTheme from "./DefaultTheme";

export function GetStyle(name) {
    if (name=='bland') {
        return defaultTheme;
    } else if (name=='colorful') {
        return colorfulTheme;
    }
}