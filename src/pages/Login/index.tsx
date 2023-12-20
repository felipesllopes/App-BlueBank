import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "expo-checkbox";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AccessButton } from "../../components/AccessButton";
import {
    InputControl,
    InputPasswordControl,
} from "../../components/InputControl";
import { LoadingModal } from "../../components/LoadingModal";
import { SendButton } from "../../components/SendButton";
import { AuthContext } from "../../contexts/auth";
import theme from "../../global/styles/theme";
import { IFormLogin } from "../../interface";
import { Container, ImgLogo, Scroll, TextCheck, ViewCheckBox } from "./styles";

export const Login: React.FunctionComponent = () => {
    const { signIn, isChecked, setIsChecked, user, loading } =
        useContext(AuthContext);

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

    const defaultValues = {
        email: isChecked ? user.email : "",
        password: "",
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
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

                <ViewCheckBox>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={theme.colors.darkBlue}
                    />
                    <TextCheck>Manter e-mail conectado.</TextCheck>
                </ViewCheckBox>

                <AccessButton
                    title="Clique aqui para "
                    titleButton="redefinir senha"
                    screen="ResetPassword"
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

            <LoadingModal loading={loading} />
        </Container>
    );
};
