import { Dimensions } from "react-native";

export const getBackgroundImage = () => {
    const dpi = Math.round(Dimensions.get("window").scale);

    if (dpi >= 1 && dpi < 2) {
        return require("../assets/Background/mdpi.jpg");
    } else if (dpi >= 2 && dpi < 3) {
        return require("../assets/Background/hdpi.jpg");
    } else if (dpi >= 3 && dpi < 4) {
        return require("../assets/Background/xhdpi.jpg");
    } else {
        return require("../assets/Background/xxxhdpi.jpg");
    }
};
