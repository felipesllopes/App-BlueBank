import styled from "styled-components/native";
import theme from "../../../global/styles/theme";
import { FlatList, FlatListProps } from "react-native";
import { IUser } from "../../../interface";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.white};
`;

export const Text = styled.Text``;

export const Contacts = styled.Text`
    font-size: 20px;
    margin: 0 0 10px 20px;
    font-weight: bold;
`;

export const FlatListContacts = styled(
    FlatList as new (props: FlatListProps<IUser>) => FlatList<IUser>,
).attrs({
    contentContainerStyle: {
        padding: 10,
    },
})``;
