import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

type FontWeight =
    | "light"
    | "regular"
    | "bold"
    | "extraBold"
    | "black";

interface CustomTextProps extends RNTextProps {
    weight?: FontWeight;
}

const fontFamilyMap: Record<FontWeight, string> = {
    light: "ProximaNova-Light",
    regular: "ProximaNova-Regular",
    bold: "ProximaNova-Bold",
    extraBold: "ProximaNova-ExtraBold",
    black: "ProximaNova-Black",
};

const Text: React.FC<CustomTextProps> = ({
    style,
    weight = "light",
    ...props
}) => {
    const fontFamily = fontFamilyMap[weight] || "ProximaNova-Regular";

    return (
        <RNText
            style={[{ fontFamily }, style]}
            className="text-light-dark"
            {...props}
        />
    );
};

export default Text;