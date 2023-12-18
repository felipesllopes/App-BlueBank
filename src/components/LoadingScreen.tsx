import React from "react";
import styled from "styled-components/native";
import theme from "../global/styles/theme";

export const LoadingScreen: React.FunctionComponent = () => {
    return (
        <Container>
            <Logo source={require("../assets/logo-bb.png")} />
        </Container>
    );
};

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.lightBlue};
    align-items: center;
    justify-content: center;
    padding-bottom: 50px;
`;

const Logo = styled.Image`
    height: 200px;
    width: 200px;
    margin-bottom: 50px;
`;
