import Ionicons from "@expo/vector-icons/Ionicons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";
import {
    InputControl,
    InputPasswordControl,
} from "../../../components/InputControl";
import { LoadingModal } from "../../../components/LoadingModal";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { Logo_name_blue } from "../../../components/Logo";
import { PrimaryButton, SecondaryButton } from "../../../components/SendButton";
import { AuthContext } from "../../../contexts/auth";
import theme from "../../../global/styles/theme";
import { IFormLogin, IScreenNavigation } from "../../../interface";
import {
    Container,
    Scroll,
    TextCheck,
    TextRecoverPassword,
    ViewCheckBox,
    Wallpaper,
} from "./styles";
import { getBackgroundImage } from "../../../functions/getBackgroundImage";
import { getBiometric } from "../../../storage";

export const Login: React.FunctionComponent = () => {
    const { signIn, isChecked, setIsChecked, user, loading } =
        useContext(AuthContext);
    const [isReady, setIsReady] = useState<boolean>(false);
    const { navigate } = useNavigation<IScreenNavigation>();

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

    if (!isReady) {
        return <LoadingScreen />;
    }

    return (
        <Container>
            <Wallpaper source={getBackgroundImage()}>
                <Scroll showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: "center", marginVertical: 50 }}>
                        <Logo_name_blue scale={2} />
                    </View>

                    <InputControl
                        iconName="mail"
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        control={control}
                        name="email"
                        errors={
                            errors.email && (errors.email?.message as string)
                        }
                    />

                    <InputPasswordControl
                        placeholder="Senha"
                        autoCapitalize="none"
                        control={control}
                        name="password"
                        errors={
                            errors.password &&
                            (errors.password?.message as string)
                        }
                    />

                    <ViewCheckBox>
                        <TextCheck>SALVAR E-MAIL </TextCheck>
                        <Checkbox
                            value={isChecked}
                            onValueChange={setIsChecked}
                            color={theme.colors.text}
                        />
                    </ViewCheckBox>

                    <PrimaryButton
                        title="ENTRAR"
                        onPress={handleSubmit(handleLogin)}
                    />

                    <SecondaryButton title="CRIAR CONTA" screen={"Register"} />

                    <TextRecoverPassword
                        onPress={() => navigate("ResetPassword")}
                    >
                        RECUPERAR SENHA
                    </TextRecoverPassword>
                </Scroll>
            </Wallpaper>
            <LoadingModal loading={loading} />
        </Container>
    );
};
