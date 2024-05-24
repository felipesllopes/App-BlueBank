import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.lightBlue};
`;

export const ViewIcons = styled.View`
    flex-direction: row;
    margin: 40px 15px;
`;

export const Input = styled.TextInput`
    background-color: white;
    padding: 2px 7px;
    font-size: 21px;
    border-radius: 5px;
    border-width: 2px;
    border-color: ${theme.colors.darkBlue};
    flex: 1;
    height: 40px;
`;

export const ViewButtons = styled.View``;

export const Button = styled.TouchableOpacity`
    margin: 0 10px 10px;
    border-radius: 4px;
    padding: 5px 10px;
`;

export const TextButton = styled.Text`
    text-align: center;
    font-size: 19px;
`;
