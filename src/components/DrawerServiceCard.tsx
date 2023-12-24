import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageSourcePropType } from "react-native";
import styled from "styled-components/native";
import { IScreenNavigation } from "../interface";
import theme from "../global/styles/theme";

interface IProps {
    screen: string;
    source?: ImageSourcePropType;
    title: string;
}

export const DrawerServiceCard: React.FunctionComponent<IProps> = ({
    screen,
    source,
    title,
}) => {
    const { navigate } = useNavigation<IScreenNavigation>();

    return (
        <ContainerServices onPress={() => navigate(screen)} activeOpacity={0.8}>
            <ImgIcon source={source} />
            <TextService>{title}</TextService>
        </ContainerServices>
    );
};

const ContainerServices = styled.TouchableOpacity`
    align-items: center;
    padding: 7px;
    background-color: rgba(100, 100, 100, 0.3);
    margin: 5px 0;
    border-radius: 5px;
    flex-direction: row;
    justify-content: center;
    border-width: 1px;
`;

const ImgIcon = styled.Image`
    width: 24px;
    height: 24px;
`;

const TextService = styled.Text`
    font-size: 16px;
    margin-left: 10px;
`;
