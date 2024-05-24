import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList, FlatListProps } from "react-native";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";
import { ITransactions } from "../../interface";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.secondary};
`;

export const HeaderTab = styled.View`
    background-color: ${theme.colors.primary};
    padding: 14px 18px;
    flex-direction: row;
`;

export const IconTab = styled(Ionicons)`
    color: ${theme.colors.white};
    font-size: 25px;
`;

export const TitleTab = styled.Text`
    font-size: 18px;
    font-weight: 500;
    color: ${theme.colors.white};
`;

export const Box = styled.View`
    align-items: center;
    margin: 26px;
`;

export const TextBalance = styled.Text`
    color: #ddd;
    font-size: 16px;
    margin-bottom: 10px;
`;

export const TextValue = styled.Text`
    font-size: 20px;
    color: white;
    text-align: center;
    font-weight: bold;
`;

export const Body = styled.View`
    background-color: ${theme.colors.white};
    flex: 1;
`;

export const ContainerList = styled.View`
    margin: 30px;
    align-self: center;
    flex: 1;
    width: 90%;
    border-radius: 10px;
    background-color: ${theme.colors.background};
`;

export const IconDate = styled(Ionicons)`
    font-size: 24px;
`;

export const TextDate = styled.Text`
    font-size: 17px;
    font-weight: 500;
    text-align: right;
    margin: 10px;
    color: ${theme.colors.text};
`;

export const LoadingList = styled.ActivityIndicator`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const FlatListTransactions = styled(
    FlatList as new (
        props: FlatListProps<ITransactions>,
    ) => FlatList<ITransactions>,
)``;

export const NotFound = styled.Text`
    font-size: 18px;
    font-style: italic;
    color: #333;
    text-align: center;
    margin-top: 50px;
`;
