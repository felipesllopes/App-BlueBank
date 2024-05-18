import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.background};
`;

export const Text = styled.Text`
    font-size: 18px;
    margin: 20px;
`;

export const Message = styled.Text`
    font-size: 18px;
    text-align: center;
    font-style: italic;
`;
