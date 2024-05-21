import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.background};
`;

export const Wallpaper = styled.ImageBackground`
    flex: 1;
    width: 100%;
`;

export const Scroll = styled.ScrollView`
    width: 100%;
    background-color: rgba(240, 245, 255, 0.9);
    padding: 0 20px;
`;

export const ViewCheckBox = styled.View`
    flex-direction: row;
    align-items: center;
    align-self: flex-end;
    margin: 10px 0 24px;
`;

export const TextCheck = styled.Text`
    font-size: 15px;
    margin-left: 5px;
`;

export const TextRecoverPassword = styled.Text`
    font-size: 15px;
    text-align: center;
    margin: 15px 10px 20px;
    text-decoration: underline;
    font-weight: bold;
`;
