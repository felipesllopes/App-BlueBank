import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Scroll = styled.ScrollView`
    flex: 1;
    padding: 10px;
`;

export const ViewAlert = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: center;
    border-width: 1px;
    margin: 10px 0;
    padding: 10px;
`;

export const Value = styled.TextInput`
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 20px;
`;

export const Data = styled.Text`
    font-size: 17px;
    margin-bottom: 20px;
`;

export const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: #000;
    margin: 10px 0;
`;

export const IconCheck = styled(Ionicons)`
    margin: 0 10px;
`;

export const Button = styled.TouchableOpacity`
    border-width: 1px;
    border-color: ${theme.colors.darkBlue};
    padding: 7px;
    background-color: ${theme.colors.white};
    border-radius: 5px;
    margin: 10px 0;
`;

export const TextButton = styled.Text`
    font-size: 18px;
    color: ${theme.colors.darkBlue};
    text-align: center;
`;
