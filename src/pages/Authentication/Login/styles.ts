import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.background};
`;

export const Scroll = styled.ScrollView`
    width: 100%;
`;

export const ViewCheckBox = styled.View`
    flex-direction: row;
    align-items: center;
    align-self: center;
    margin: 10px 0 20px;
`;

export const TextCheck = styled.Text`
    font-size: 16px;
    margin-left: 5px;
`;
