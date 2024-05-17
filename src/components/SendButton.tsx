import React from "react";
import styled from "styled-components/native";
import theme from "../global/styles/theme";
import { TouchableOpacityProps } from "react-native";

interface IProps extends TouchableOpacityProps{
    title: string;
    onPress: () => void;
}

export const SendButton: React.FunctionComponent<IProps> = ({
    title,
    onPress,
    ...otherProps
}) => {
    return (
        <Button
            onPress={onPress}
            activeOpacity={0.7}
            style={{ elevation: 4 }}
            {...otherProps}
        >
            <TextButton>{title}</TextButton>
        </Button>
    );
};

const Button = styled.TouchableOpacity`
    background-color: ${theme.colors.primary};
    padding: 8px;
    border-radius: 10px;
    margin: 10px 20px 20px;
`;

const TextButton = styled.Text`
    font-size: 19px;
    color: ${theme.colors.white};
    text-align: center;
`;
