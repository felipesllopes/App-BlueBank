import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageSourcePropType } from "react-native";
import styled from "styled-components/native";
import theme from "../global/styles/theme";
import { IScreenNavigation } from "../interface";

interface IProps {
    screen: string;
    source: ImageSourcePropType;
    nameCard: string;
}

export const ServiceCard: React.FunctionComponent<IProps> = ({
    screen,
    source,
    nameCard,
}) => {
    const { navigate } = useNavigation<IScreenNavigation>();

    return (
        <CardButtons
            style={{ elevation: 5 }}
            onPress={() => navigate(screen)}
            activeOpacity={0.9}
        >
            <IconCard source={source} resizeMode="contain" />
            <NameCard>{nameCard}</NameCard>
        </CardButtons>
    );
};

const CardButtons = styled.TouchableOpacity`
    height: 100px;
    width: 108px;
    background-color: ${theme.colors.white};
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    margin: 6px;
    margin-bottom: 10px;
`;

const IconCard = styled.Image`
    height: 30px;
    width: 30px;
`;

const NameCard = styled.Text`
    font-weight: bold;
    margin-top: 8px;
`;
