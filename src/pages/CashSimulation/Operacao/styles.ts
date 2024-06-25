import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.secondary};
`;

export const TextOperation = styled.Text`
    font-size: 20px;
    text-align: center;
    font-weight: 500;
    margin: 20px 0 20px;
`;

export const ViewIcons = styled.View`
    flex-direction: row;
    margin: 40px 15px;
`;

export const Input = styled.TextInput`
    background-color: white;
    padding: 2px 6px;
    font-size: 20px;
    border-radius: 5px;
    border-width: 2px;
    flex: 1;
    height: 36px;
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
