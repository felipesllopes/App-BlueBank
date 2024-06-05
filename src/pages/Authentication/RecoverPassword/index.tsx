import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { InputControl } from "../../../components/InputControl";
import { PrimaryButton, SecondaryButton } from "../../../components/SendButton";
import { AuthContext } from "../../../contexts/auth";
import { getBackgroundImage } from "../../../functions/getBackgroundImage";
import { IFormResetPassword } from "../../../interface";
import { Container, Scroll, Wallpaper } from "../Login/styles";
import { Message, Text } from "./styles";

export const ResetPassword: React.FunctionComponent = () => {
    const { resetPassword } = useContext(AuthContext);
    const [message, setMessage] = useState<string>("");

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

    return (
        <Container>
            <Wallpaper source={getBackgroundImage()}>
                <Scroll>
                    <Text>Digite o e-mail cadastrado:</Text>
                    <InputControl
                        control={control}
                        iconName="mail"
                        name="email"
                        errors={
                            errors.email && (errors.email?.message as string)
                        }
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {message && (
                        <Message style={{ elevation: 5 }}>{message}</Message>
                    )}

                    <PrimaryButton
                        onPress={handleSubmit(handlePassword)}
                        title="REDEFINIR SENHA"
                    />

                    <SecondaryButton screen="Login" title="ENTRAR" />
                </Scroll>
            </Wallpaper>
        </Container>
    );
};
