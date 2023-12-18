import styled from "styled-components/native";
import theme from "../../global/styles/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.lightBlue};
`;

export const TextBalance = styled.Text`
    font-size: 20px;
    color: white;
    text-align: center;
    font-weight: bold;
    margin: 20px;
`;

export const Body = styled.View`
    background-color: ${theme.colors.white};
    flex: 1;
    border-top-left-radius: 60px;
    border-top-right-radius: 60px;
`;

export const ViewTop = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin: 10px;
`;

export const TextTransactions = styled.Text`
    font-size: 20px;
    font-weight: bold;
`;

export const IconDate = styled(Ionicons)`
    font-size: 24px;
`;

export const TextDate = styled.Text`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin: 10px;
    color: #666;
`;
