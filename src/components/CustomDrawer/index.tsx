import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";
import theme from "../../global/styles/theme";
import { IScreenNavigation } from "../../interface";
import { DrawerServiceCard } from "../DrawerServiceCard";
import { Logo_blue } from "../Logo";
import { Container, ContainerCash, IconCash, TextService } from "./styles";

export const CustomDrawer: React.FunctionComponent<
    DrawerContentComponentProps
> = () => {
    const { navigate } = useNavigation<IScreenNavigation>();

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
                <Logo_blue scale={10} />
                <TextService style={{ marginLeft: 10 }}>Início</TextService>
            </Container>

            <ContainerCash
                onPress={() => navigate("CashSimulationRoutes")}
                activeOpacity={0.8}
                style={{ elevation: 10 }}
            >
                <IconCash
                    source={require("../../assets/IconsService/caixa_eletronico.png")}
                    resizeMode="contain"
                />
                <Text>CAIXA ELETRÔNICO</Text>
            </ContainerCash>

            <DrawerServiceCard screen="Transacoes" title="Transações" />

            <DrawerServiceCard screen="Cartao" title="Cartões" />

            <DrawerServiceCard screen="Fatura" title="Fatura" />

            <DrawerServiceCard screen="Recarga" title="Recarga" />

            <DrawerServiceCard screen="Pix" title="Pix" />

            <DrawerServiceCard screen="Boleto" title="Boleto" />

            <DrawerServiceCard screen="Transferencia" title="Transferência" />

            <DrawerServiceCard screen="Poupanca" title="Poupança" />

            <DrawerServiceCard screen="Investimento" title="Investimentos" />

            <DrawerServiceCard screen="Negociacao" title="Negociar dívidas" />

            <DrawerServiceCard screen="Ajuda" title="Ajuda" />

            <DrawerServiceCard screen="Contrato" title="Contrato" />
        </DrawerContentScrollView>
    );
};
