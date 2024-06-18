import styled from "styled-components/native";
import React from "react";
import theme from "../global/styles/theme";
import { useNavigation } from "@react-navigation/native";
import { IScreenNavigation } from "../interface";

export const BiometricsRegistrationService: React.FunctionComponent = () => {
    const { navigate } = useNavigation<IScreenNavigation>();

    return (
        <Container
            onPress={() => navigate("Biometry")}
            activeOpacity={0.8}
            style={{ elevation: 10 }}
        >
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
<<<<<<< HEAD
=======
    /* border-width: 2px; */
>>>>>>> d8d3304b2ccbfcea8ed0d036eae45aba3e518c25
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
