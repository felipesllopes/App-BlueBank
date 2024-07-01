import Ionicons from "@expo/vector-icons/Ionicons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { InputControl } from "../../../components/InputControl";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { PrimaryButton, SecondaryButton } from "../../../components/SendButton";
import { AuthContext } from "../../../contexts/auth";
import { IFormResetPassword } from "../../../interface";
import { Container, Scroll, ViewOpacity, Wallpaper } from "../Login/styles";
import { Message, Text } from "./styles";

export const ResetPassword: React.FunctionComponent = () => {
    const { resetPassword } = useContext(AuthContext);
    const [message, setMessage] = useState<string>("");
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await Ionicons.loadFont().then(() => {
                setIsReady(true);
            });
        })();
    }, []);

    const schema = yup.object({
        email: yup
            .string()
            .email("E-mail inválido.")
            .required("Informe seu e-mail."),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handlePassword = (data: IFormResetPassword) => {
        resetPassword(data, setMessage);
        reset();
    };

    if (!isReady) {
        return <LoadingScreen />;
    }

    return (
        <Container>
            <Wallpaper
                source={require("../../../assets/Background/background.jpg")}
            >
                <ViewOpacity>
                    <Scroll>
                        <Text>Digite o e-mail cadastrado:</Text>
                        <InputControl
                            control={control}
                            iconName="mail"
                            name="email"
                            errors={
                                errors.email &&
                                (errors.email?.message as string)
                            }
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        {message && (
                            <Message style={{ elevation: 5 }}>
                                {message}
                            </Message>
                        )}

                        <PrimaryButton
                            onPress={handleSubmit(handlePassword)}
                            title="REDEFINIR SENHA"
                        />

                        <SecondaryButton screen="Login" title="ENTRAR" />
                    </Scroll>
                </ViewOpacity>
            </Wallpaper>
        </Container>
    );
};
