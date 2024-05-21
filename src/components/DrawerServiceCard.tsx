import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import theme from "../global/styles/theme";
import { IScreenNavigation } from "../interface";

interface IProps {
    screen: string;
    title: string;
}

export const DrawerServiceCard: React.FunctionComponent<IProps> = ({
    screen,
    title,
}) => {
    const { navigate } = useNavigation<IScreenNavigation>();

    return (
        <ContainerServices onPress={() => navigate(screen)}>
            <TextService>{title}</TextService>
            <Ionicons
                name="arrow-forward"
                size={20}
                color={theme.colors.white}
            />
        </ContainerServices>
    );
};

const ContainerServices = styled.TouchableOpacity`
    align-items: center;
    padding: 7px;
    margin: 5px 0;
    border-bottom-width: 0.5px;
    flex-direction: row;
    justify-content: space-between;
    border-color: ${theme.colors.gray};
`;

const TextService = styled.Text`
    font-size: 16px;
    margin-left: 10px;
    color: white;
`;
