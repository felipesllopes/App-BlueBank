import Ionicons from "@expo/vector-icons/Ionicons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import * as yup from "yup";
import {
    InputControl,
    InputPasswordControl,
} from "../../../components/InputControl";
import { LoadingModal } from "../../../components/LoadingModal";
import { LoadingScreen } from "../../../components/LoadingScreen";
<<<<<<< HEAD
import { Logo_name_white } from "../../../components/Logo";
import { PrimaryButton, SecondaryButton } from "../../../components/SendButton";
import { AuthContext } from "../../../contexts/auth";
import { getAuthWithBiometry } from "../../../functions/getAuthWithBiometry";
import { getBackgroundImage } from "../../../functions/getBackgroundImage";
import theme from "../../../global/styles/theme";
import { IFormLogin, IScreenNavigation } from "../../../interface";
import { getBiometric, getItem } from "../../../storage";
import {
    ButtonBiometry,
    Container,
    IconBiometry,
    Scroll,
    Text,
    TextBiometry,
    TextCheck,
    TextRecoverPassword,
    ViewCheckBox,
    ViewLogo,
    ViewOpacity,
=======
import { Logo_name_blue } from "../../../components/Logo";
import { PrimaryButton, SecondaryButton } from "../../../components/SendButton";
import { AuthContext } from "../../../contexts/auth";
import { getBackgroundImage } from "../../../functions/getBackgroundImage";
import theme from "../../../global/styles/theme";
import { IFormLogin, IScreenNavigation } from "../../../interface";
import { getItem } from "../../../storage";
import {
    Container,
    Scroll,
    TextCheck,
    TextRecoverPassword,
    ViewCheckBox,
>>>>>>> d8d3304b2ccbfcea8ed0d036eae45aba3e518c25
    Wallpaper,
} from "./styles";

export const Login: React.FunctionComponent = () => {
<<<<<<< HEAD
    const {
        signIn,
        isChecked,
        setIsChecked,
        user,
        loading,
        setLoading,
        setUser,
    } = useContext(AuthContext);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [isFontsLoaded, setIsFontsLoaded] = useState<boolean>(false);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [isBiometry, setIsBiometry] = useState<boolean>(false);
=======
    const { signIn, isChecked, setIsChecked, user, loading, setUser } =
        useContext(AuthContext);

    const [isReady, setIsReady] = useState<boolean>(false);
    const [isFontsLoaded, setIsFontsLoaded] = useState<boolean>(false);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
>>>>>>> d8d3304b2ccbfcea8ed0d036eae45aba3e518c25
    const { navigate } = useNavigation<IScreenNavigation>();

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
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        (async () => {
            await Ionicons.loadFont().then(() => {
                setIsFontsLoaded(true);
            });
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await getItem(setIsChecked, setUser, setIsDataLoaded);
        })();
    }, [setIsChecked, setUser]);

    useEffect(() => {
        if (isFontsLoaded && isDataLoaded) {
            setIsReady(true);
        }
    }, [isFontsLoaded, isDataLoaded]);

    useEffect(() => {
        if (isChecked) {
            reset({
                email: user.email,
                password: "",
            });
        } else {
            reset({
                email: "",
                password: "",
            });
        }
<<<<<<< HEAD
    }, [user.email, reset]);

    useEffect(() => {
        (async () => {
            await getBiometric().then(async value => {
                setIsBiometry(await value);
            });
        })();
    }, [getBiometric, setIsBiometry]);
=======
    }, [isChecked, user.email, reset]);
>>>>>>> d8d3304b2ccbfcea8ed0d036eae45aba3e518c25

    const handleLogin = (data: IFormLogin) => {
        signIn(data);
    };

    const handleToggle = (isOn: boolean) => {
        setIsChecked(isOn);
    };

    if (!isReady) {
        return <LoadingScreen />;
    }

    return (
        <Container>
            <Wallpaper source={getBackgroundImage()}>
<<<<<<< HEAD

                <ViewOpacity>
                    <ViewLogo>
                        <Logo_name_white scale={2.3} />
                    </ViewLogo>

                    <Scroll showsVerticalScrollIndicator={false}>
                        {isBiometry ? (
                            <View>
                                <ButtonBiometry
                                    onPress={() =>
                                        getAuthWithBiometry(setUser, setLoading)
                                    }
                                    activeOpacity={0.6}
                                >
                                    <TextBiometry>
                                        Entrar com biometria
                                    </TextBiometry>
                                    <IconBiometry
                                        source={require("../../../assets/biometry.png")}
                                    />
                                </ButtonBiometry>

                                <Text>OU</Text>
                            </View>
                        ) : (
                            <View style={{ marginBottom: "10%" }} />
                        )}

                        <InputControl
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            control={control}
                            name="email"
                            errors={
                                errors.email &&
                                (errors.email?.message as string)
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
                            <TextCheck>SALVAR E-MAIL</TextCheck>
                            <ToggleSwitch
                                isOn={isChecked}
                                onColor={theme.colors.primary}
                                offColor={theme.colors.gray}
                                onToggle={handleToggle}
                            />
                        </ViewCheckBox>

                        <PrimaryButton
                            title="ENTRAR"
                            onPress={handleSubmit(handleLogin)}
                        />

                        <SecondaryButton
                            title="CRIAR CONTA"
                            screen={"Register"}
                        />

                        <TextRecoverPassword
                            onPress={() => navigate("ResetPassword")}
                        >
                            RECUPERAR SENHA
                        </TextRecoverPassword>
                    </Scroll>
                </ViewOpacity>
=======
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
                        <TextCheck>SALVAR E-MAIL</TextCheck>
                        <ToggleSwitch
                            isOn={isChecked}
                            onColor={theme.colors.primary}
                            offColor={theme.colors.gray}
                            onToggle={handleToggle}
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
>>>>>>> d8d3304b2ccbfcea8ed0d036eae45aba3e518c25
            </Wallpaper>
            <LoadingModal loading={loading} />
        </Container>
    );
};
