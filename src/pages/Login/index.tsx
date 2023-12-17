import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AccessButton } from "../../components/AccessButton";
import {
    InputControl,
    InputPasswordControl,
} from "../../components/InputControl";
import { SendButton } from "../../components/SendButton";
import { AuthContext } from "../../contexts/auth";
import { IFormLogin } from "../../interface";
import { Container, ImgLogo, Scroll } from "./styles";

export const Login: React.FunctionComponent = () => {
    const { signIn } = useContext(AuthContext);

    const schema = yup.object({
        email: yup
            .string()
            .email("E-mail inválido.")
            .required("Informe seu e-mail."),
        password: yup
            .string()
            .min(6, "Mínimo de 6 dígitos.")
            .required("Digite a sua senha."),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleLogin = (data: IFormLogin) => {
        signIn(data);
    };

    return (
        <Container>
            <Scroll showsVerticalScrollIndicator={false}>
                <ImgLogo source={require("../../assets/logo-bb.png")} />

                <InputControl
                    iconName="mail"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    control={control}
                    name="email"
                    errors={errors.email && (errors.email?.message as string)}
                />

                <InputPasswordControl
                    placeholder="Senha"
                    autoCapitalize="none"
                    control={control}
                    name="password"
                    errors={
                        errors.password && (errors.password?.message as string)
                    }
                />

                <AccessButton
                    title="Clique aqui para "
                    titleButton="recuperar senha"
                    screen="RecoverPassword"
                />

                <SendButton
                    title="Entrar"
                    onPress={handleSubmit(handleLogin)}
                />

                <AccessButton
                    title="Não tem conta? "
                    titleButton="Se registar"
                    screen="Register"
                />
            </Scroll>
        </Container>
    );
};
