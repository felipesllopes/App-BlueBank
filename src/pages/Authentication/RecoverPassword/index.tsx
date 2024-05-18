import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { InputControl } from "../../../components/InputControl";
import { SendButton } from "../../../components/SendButton";
import { AuthContext } from "../../../contexts/auth";
import { IFormResetPassword } from "../../../interface";
import { Container, Message, Text } from "./styles";

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
            <Text>Digite o e-mail cadastrado:</Text>
            <InputControl
                control={control}
                iconName="mail"
                name="email"
                errors={errors.email && (errors.email?.message as string)}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <SendButton
                onPress={handleSubmit(handlePassword)}
                title="Redefinir senha"
            />

            <Message>{message}</Message>
        </Container>
    );
};
