import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Container = styled.TouchableOpacity`
    align-items: center;
    padding: 5px;
    background-color: rgba(100, 100, 100, 0.3);
    margin: 5px 0;
    border-radius: 5px;
    border-width: 1px;
`;

export const Logo = styled.Image`
    height: 80px;
    width: 80px;
`;

export const Text = styled.Text`
    font-size: 16px;
    color: white;
    font-weight: bold;
    margin-top: 5px;
    text-align: center;
`;

export const UserIcon = styled(Ionicons)`
    font-size: 30px;
    color: white;
`;

export const Line = styled.View`
    width: 100%;
    border-width: 1px;
    border-color: ${theme.colors.white};
    margin: 10px 0;
`;

export const IconCash = styled.Image`
    height: 30px;
    width: 30px;
    align-self: center;
    margin: 3px;
`;

export const TextCash = styled.Text`
    font-size: 15px;
    font-weight: bold;
`;
