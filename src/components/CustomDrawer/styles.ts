import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Container = styled.TouchableOpacity`
    align-items: center;
    padding: 5px;
    margin: 5px 0;
    flex-direction: row;
    align-self: center;
`;

export const ContainerCash = styled.TouchableOpacity`
    background-color: ${theme.colors.white};
    align-items: center;
    border-radius: 10px;
    align-self: center;
    padding: 2px 10px;
    margin: 10px 0;
`;

export const IconCash = styled.Image`
    height: 30px;
    width: 30px;
    align-self: center;
    margin: 3px;
`;

export const TextService = styled.Text`
    font-size: 16px;
    color: white;
    margin-top: 5px;
    text-align: center;
`;
