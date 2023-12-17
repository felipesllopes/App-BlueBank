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
import { IFormRegister } from "../../interface";
import { Container, ImgLogo, Scroll } from "./styles";

export const Register: React.FunctionComponent = () => {
    const { signUp } = useContext(AuthContext);

    const schema = yup.object({
        email: yup
            .string()
            .email("E-mail inválido.")
            .required("Informe seu e-mail."),
        name: yup.string().required("Informe seu nome completo."),
        cpf: yup
            .string()
            .min(11, "Mínimo de 11 dígitos")
            .required("Digite seu CPF."),
        password: yup
            .string()
            .min(6, "Mínimo de 6 dígitos.")
            .required("Digite a sua senha."),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Confirmação incorreta."),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleRegister = (data: IFormRegister) => {
        signUp(data);
    };

    return (
        <Container>
            <Scroll showsVerticalScrollIndicator={false}>
                <ImgLogo source={require("../../assets/logo-bb.png")} />

                <InputControl
                    iconName="person"
                    placeholder="Nome completo"
                    autoCapitalize="words"
                    control={control}
                    name="name"
                    errors={errors.name && (errors.name?.message as string)}
                />

                <InputControl
                    iconName="mail"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    control={control}
                    name="email"
                    errors={errors.email && (errors.email?.message as string)}
                />

                <InputControl
                    iconName="card"
                    placeholder="CPF"
                    keyboardType="numeric"
                    maxLength={11}
                    control={control}
                    name="cpf"
                    errors={errors.cpf && (errors.cpf?.message as string)}
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

                <InputPasswordControl
                    placeholder="Confirmar senha"
                    autoCapitalize="none"
                    control={control}
                    name="confirmPassword"
                    errors={
                        errors.confirmPassword &&
                        (errors.confirmPassword?.message as string)
                    }
                />

                <SendButton
                    title="Registrar"
                    onPress={handleSubmit(handleRegister)}
                />

                <AccessButton
                    title="Já possui conta? "
                    titleButton="Fazer login"
                    screen="Login"
                />
            </Scroll>
        </Container>
    );
};
