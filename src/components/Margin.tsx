import React from "react";
import { View } from "react-native";

interface IProps {
    pixels: number;
}

export const Margin: React.FunctionComponent<IProps> = ({ pixels }) => {
    return <View style={{ marginBottom: pixels }} />;
};
