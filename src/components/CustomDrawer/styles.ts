import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Container = styled.View`
    flex: 1;
    background-color: ${theme.colors.secondary};
    padding: 0 10px;
`;

export const Header = styled.View`
    align-items: center;
    padding: 5px;
    margin: 5px 0;
    flex-direction: row;
    justify-content: space-between;
`;

export const IconClose = styled(Ionicons)`
    font-size: 18px;
`;

export const ContainerCash = styled.TouchableOpacity`
    background-color: #d5d5d5;
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

export const ContainerLogout = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px;
    align-self: center;
`;

export const TextLogout = styled.Text`
    font-size: 19px;
`;

export const ButtonLogout = styled(Ionicons)`
    font-size: 24px;
    margin-left: 10px;
`;
