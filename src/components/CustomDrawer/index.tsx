import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View } from "react-native";
import { AuthContext } from "../../contexts/auth";
import theme from "../../global/styles/theme";
import { IScreenNavigation } from "../../interface";
import { Logo } from "../../pages/Home/styles";
import { DrawerServiceCard } from "../DrawerServiceCard";
import { SendButton } from "../SendButton";
import { Container, IconCash, Line, Text, TextCash, UserIcon } from "./styles";

export const CustomDrawer: React.FunctionComponent<
    DrawerContentComponentProps
> = () => {
    const { navigate } = useNavigation<IScreenNavigation>();
    const { user, logOut } = useContext(AuthContext);

    return (
        <DrawerContentScrollView
            showsVerticalScrollIndicator={false}
            style={{
                backgroundColor: theme.colors.secondary,
                paddingHorizontal: 10,
                flex: 1,
            }}
        >
            <Container
                onPress={() => navigate("HomeRoutes")}
                activeOpacity={0.8}
            >
                <Logo
                    source={require("../../assets/logo-bb.png")}
                    resizeMode="contain"
                />
                <Text>Início</Text>
            </Container>

            {/* <Container
                onPress={() => navigate("ProfileRoutes")}
                activeOpacity={0.8}
            >
                <UserIcon name="person-circle" />
                <Text style={{ fontWeight: "normal" }}>{user.name}</Text>
            </Container> */}

            <Line />

            <Text>Mais serviços:</Text>
            <View style={{ marginBottom: 12 }} />

            <Container
                onPress={() => navigate("CashSimulationRoutes")}
                activeOpacity={0.8}
            >
                <IconCash
                    source={require("../../assets/IconsService/caixa_eletronico.png")}
                    resizeMode="contain"
                />
                <TextCash>CAIXA ELETRÔNICO</TextCash>
            </Container>

            <DrawerServiceCard
                screen="Transacoes"
                source={require("../../assets/IconsService/transacao.png")}
                title="Transações"
            />

            <DrawerServiceCard
                screen="Cartao"
                source={require("../../assets/IconsService/cartao.png")}
                title="Cartões"
            />

            <DrawerServiceCard
                screen="Deposito"
                source={require("../../assets/IconsService/deposito.png")}
                title="Depósito"
            />

            <DrawerServiceCard
                screen="Pix"
                source={require("../../assets/IconsService/pix.png")}
                title="Pix"
            />

            <DrawerServiceCard
                screen="Transferencia"
                source={require("../../assets/IconsService/transferencia.png")}
                title="Transferência"
            />

            <View style={{ marginBottom: 20 }} />

            <SendButton title="Sair" onPress={logOut} />
        </DrawerContentScrollView>
    );
};
