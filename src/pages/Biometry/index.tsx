import { useNavigation } from "@react-navigation/native";
<<<<<<< HEAD
import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";
import * as Keychain from "react-native-keychain";
import { ModalPasswordConfirm } from "../../components/ModalPasswordConfirm";
import { AuthContext } from "../../contexts/auth";
=======
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";
>>>>>>> d8d3304b2ccbfcea8ed0d036eae45aba3e518c25
import { setBiometric } from "../../storage";
import { Button, Container, Img, Text, TextButton, Title } from "./styles";

export const Biometry: React.FunctionComponent = () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const { goBack } = useNavigation();

    const [biometryType, setBiometryType] = useState(null);
<<<<<<< HEAD
    const { user } = useContext(AuthContext);
    const [show, setShow] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
=======

    useState<boolean>(false);
>>>>>>> d8d3304b2ccbfcea8ed0d036eae45aba3e518c25

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

<<<<<<< HEAD
    const getRegisterBiometry = async () => {
        await rnBiometrics
=======
    const handleBiometricAuth = () => {
        rnBiometrics
>>>>>>> d8d3304b2ccbfcea8ed0d036eae45aba3e518c25
            .simplePrompt({ promptMessage: "Confirmar impressão digital" })
            .then(async resultObject => {
                const { success } = resultObject;
                if (success) {
<<<<<<< HEAD
                    setShow(true);
=======
                    Alert.alert(
                        "Biometria cadastrada",
                        "Agora você pode logar e fazer transações rapidamente.",
                    );
                    await setBiometric().then(() => {
                        goBack();
                    });
>>>>>>> d8d3304b2ccbfcea8ed0d036eae45aba3e518c25
                } else {
                    Alert.alert(
                        "Solicitação biométrica cancelada pelo usuário",
                    );
<<<<<<< HEAD
                    setShow(false);
=======
>>>>>>> d8d3304b2ccbfcea8ed0d036eae45aba3e518c25
                }
            })
            .catch(() => {
                Alert.alert("Falha na autenticação biométrica");
            });
    };

<<<<<<< HEAD
    const handleFunction = async () => {
        await Keychain.setGenericPassword(user.email, password).then(
            async () => {
                await setBiometric().then(() => {
                    Alert.alert("Biometria cadastrada");
                    goBack();
                });
            },
        );
    };

=======
>>>>>>> d8d3304b2ccbfcea8ed0d036eae45aba3e518c25
    return (
        <Container>
            <Img source={require("../../assets/biometry.png")} />
            <Title>Cadastrar biometria</Title>
            <Text>Use sua digital para um acesso mais rápido e seguro.</Text>

<<<<<<< HEAD
            <Button onPress={getRegisterBiometry} activeOpacity={0.7}>
                <TextButton>Continuar</TextButton>
            </Button>

            <Button
                onPress={() => goBack()}
                activeOpacity={0.7}
                style={{ backgroundColor: "transparent" }}
            >
                <TextButton>Voltar</TextButton>
            </Button>

            <ModalPasswordConfirm
                setShow={setShow}
                show={show}
                setPassword={setPassword}
                handleFunction={handleFunction}
            />
=======
            <Button onPress={handleBiometricAuth}>
                <TextButton>Continuar</TextButton>
            </Button>

            <Button style={{ borderWidth: 0 }}>
                <TextButton>Voltar</TextButton>
            </Button>
>>>>>>> d8d3304b2ccbfcea8ed0d036eae45aba3e518c25
        </Container>
    );
};
