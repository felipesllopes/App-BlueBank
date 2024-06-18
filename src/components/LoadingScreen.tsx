import React from "react";
import styled from "styled-components/native";
import theme from "../global/styles/theme";

export const LoadingScreen: React.FunctionComponent = () => {
    return (
        <Container
            source={require("../assets/Logo/splashscreen.png")}
            resizeMode="contain"
        ></Container>
    );
};

const Container = styled.ImageBackground`
    flex: 1;
    background-color: ${theme.colors.primary};
`;
