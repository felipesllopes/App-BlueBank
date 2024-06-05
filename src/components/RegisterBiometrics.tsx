import styled from "styled-components/native";
import React from "react";
import theme from "../global/styles/theme";

export const RegisterBiometrics: React.FunctionComponent = () => {
    return (
        <Container activeOpacity={0.8} style={{ elevation: 10 }}>
            <Title>Cadastrar biometria</Title>
            <Image source={require("../assets/IconsService/biometric.png")} />
        </Container>
    );
};

const Container = styled.TouchableOpacity`
    background-color: ${theme.colors.white};
    align-self: center;
    align-items: center;
    padding: 24px 10px;
    border-radius: 30px;
    width: 30%;
    /* border-width: 2px; */
`;

const Title = styled.Text`
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 10px;
    text-align: center;
`;

const Image = styled.Image`
    width: 50px;
    height: 50px;
`;
