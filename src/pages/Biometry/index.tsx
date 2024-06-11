import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";
import { setBiometric } from "../../storage";
import { Button, Container, Img, Text, TextButton, Title } from "./styles";

export const Biometry: React.FunctionComponent = () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const { goBack } = useNavigation();

    const [biometryType, setBiometryType] = useState(null);

    useState<boolean>(false);

    useEffect(() => {
        rnBiometrics.isSensorAvailable().then(resultObject => {
            const { available, biometryType } = resultObject;
            if (available) {
                setBiometryType(biometryType);
            } else {
                Alert.alert("Biometria não suportada");
            }
        });
    }, []);

    const handleBiometricAuth = () => {
        rnBiometrics
            .simplePrompt({ promptMessage: "Confirmar impressão digital" })
            .then(async resultObject => {
                const { success } = resultObject;
                if (success) {
                    Alert.alert(
                        "Biometria cadastrada",
                        "Agora você pode logar e fazer transações rapidamente.",
                    );
                    await setBiometric().then(() => {
                        goBack();
                    });
                } else {
                    Alert.alert(
                        "Solicitação biométrica cancelada pelo usuário",
                    );
                }
            })
            .catch(() => {
                Alert.alert("Falha na autenticação biométrica");
            });
    };

    return (
        <Container>
            <Img source={require("../../assets/biometry.png")} />
            <Title>Cadastrar biometria</Title>
            <Text>Use sua digital para um acesso mais rápido e seguro.</Text>

            <Button onPress={handleBiometricAuth}>
                <TextButton>Continuar</TextButton>
            </Button>

            <Button style={{ borderWidth: 0 }}>
                <TextButton>Voltar</TextButton>
            </Button>
        </Container>
    );
};
