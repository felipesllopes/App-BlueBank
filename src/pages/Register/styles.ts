import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.lightBlue};
`;

export const Scroll = styled.ScrollView`
    width: 100%;
`;

export const ImgLogo = styled.Image`
    width: 70px;
    height: 70px;
    align-self: center;
    margin: 30px 0;
`;
