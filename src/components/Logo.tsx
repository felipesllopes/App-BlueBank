import React from "react";
import { Image } from "react-native";

interface IProps {
    scale: number;
}

export const Logo_name_blue: React.FunctionComponent<IProps> = ({ scale }) => {
    return (
        <Image
            source={require("../assets/Logo/logo_name-blue.png")}
            style={{
                height: 121 / scale,
                width: 391 / scale,
            }}
        />
    );
};

export const Logo_name_white: React.FunctionComponent<IProps> = ({ scale }) => {
    return (
        <Image
            source={require("../assets/Logo/logo_name-white.png")}
            style={{
                height: 121 / scale,
                width: 391 / scale,
            }}
        />
    );
};

export const Logo_white: React.FunctionComponent<IProps> = ({ scale }) => {
    return (
        <Image
            source={require("../assets/Logo/logo-white.png")}
            style={{
                height: 301 / scale,
                width: 401 / scale,
            }}
        />
    );
};

export const Logo_blue: React.FunctionComponent<IProps> = ({ scale }) => {
    return (
        <Image
            source={require("../assets/Logo/logo-blue.png")}
            style={{
                height: 301 / scale,
                width: 401 / scale,
            }}
        />
    );
};
