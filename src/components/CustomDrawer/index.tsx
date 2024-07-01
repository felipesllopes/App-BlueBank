import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Text } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { IScreenNavigation } from "../../interface";
import { DrawerServiceCard } from "../DrawerServiceCard";
import { Logo_blue } from "../Logo";
import {
    IconLogout,
    Container,
    ContainerCash,
    ContainerLogout,
    Header,
    IconCash,
    IconClose,
    TextLogout,
} from "./styles";

export const CustomDrawer: React.FunctionComponent<
    DrawerContentComponentProps
> = () => {
    const { navigate } = useNavigation<IScreenNavigation>();
    const { logOut } = useContext(AuthContext);

    return (
        <Container>
            <Header>
                <Logo_blue scale={10} />
                <IconClose name="close" onPress={() => navigate("Home")} />
            </Header>

            <DrawerContentScrollView showsVerticalScrollIndicator={false}>
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

                <DrawerServiceCard
                    screen="Transferencia"
                    title="Transferência"
                />

                <DrawerServiceCard screen="Poupanca" title="Poupança" />

                <DrawerServiceCard
                    screen="Investimento"
                    title="Investimentos"
                />

                <DrawerServiceCard
                    screen="Negociacao"
                    title="Negociar dívidas"
                />

                <DrawerServiceCard screen="Ajuda" title="Ajuda" />

                <DrawerServiceCard screen="Contrato" title="Contrato" />
            </DrawerContentScrollView>

            <ContainerLogout onPress={logOut}>
                <TextLogout>Fazer Logout</TextLogout>
                <IconLogout name="log-out-outline" />
            </ContainerLogout>
        </Container>
    );
};
