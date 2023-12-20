import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.white};
`;

export const Header = styled.View`
    background-color: ${theme.colors.lightBlue};
`;

export const BoxText = styled.View`
    margin: 12px;
`;

export const TextBold = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${theme.colors.white};
`;

export const Text = styled.Text`
    color: ${theme.colors.white};
    font-size: 15px;
`;
