import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { CustomDrawer } from "../components/CustomDrawer";
import theme from "../global/styles/theme";
import { Cartao } from "../pages/Cartao";
import { HomeCash } from "../pages/CashSimulation/HomeCash";
import { Operation } from "../pages/CashSimulation/Operation";
import { Contract } from "../pages/Contract";
import { Fatura } from "../pages/Fatura";
import { Help } from "../pages/Help";
import { Home } from "../pages/Home";
import { Investimento } from "../pages/Investimento";
import { Negotiation } from "../pages/Negotiation";
import { ConfirmPix } from "../pages/Pix/ConfirmPix";
import { Pix } from "../pages/Pix/Home";
import { PayPix } from "../pages/Pix/PayPix";
import { PaymentVoucher } from "../pages/Pix/PaymentVoucher";
import { Profile } from "../pages/Profile";
import { Recarga } from "../pages/Recarga";
import { Poupanca } from "../pages/Poupanca";
import { Transacoes } from "../pages/Transactions";
import { TransactionsDetails } from "../pages/Transactions/TransactionsDetails";
import { Transferencia } from "../pages/Transferencia";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeRoutes: React.FunctionComponent = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: "slide_from_right",
                headerTintColor: theme.colors.white,
                headerStyle: { backgroundColor: theme.colors.primary },
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Pix"
                component={Pix}
                options={{ title: "Pix" }}
            />

            <Stack.Screen
                name="Cartao"
                component={Cartao}
                options={{ title: "Cartões" }}
            />

            <Stack.Screen name="Fatura" component={Fatura} />

            <Stack.Screen name="Recarga" component={Recarga} />

            <Stack.Screen
                name="Transferencia"
                component={Transferencia}
                options={{ title: "Transferência" }}
            />

            <Stack.Screen
                name="Transacoes"
                component={Transacoes}
                options={{ title: "Transações" }}
            />

            <Stack.Screen
                name="Help"
                component={Help}
                options={{ title: "Ajuda" }}
            />

            <Stack.Screen
                name="Contract"
                component={Contract}
                options={{ title: "Contrato" }}
            />

            <Stack.Screen
                name="Negotiation"
                component={Negotiation}
                options={{ title: "Negociação" }}
            />

            <Stack.Screen
                name="PayPix"
                component={PayPix}
                options={{ title: "Pagamento" }}
            />

            <Stack.Screen
                name="ConfirmPix"
                component={ConfirmPix}
                options={{ title: "Confirmar" }}
            />

            <Stack.Screen
                name="PaymentVoucher"
                component={PaymentVoucher}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="TransactionsDetails"
                component={TransactionsDetails}
                options={{ title: "Detalhes da transação" }}
            />

            <Stack.Screen
                name="Investimento"
                component={Investimento}
                options={{ title: "Investimentos" }}
            />

            <Stack.Screen
                name="Poupanca"
                component={Poupanca}
                options={{ title: "Poupança" }}
            />
        </Stack.Navigator>
    );
};

const ProfileRoutes: React.FunctionComponent = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

const CashSimulationRoutes: React.FunctionComponent = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: "slide_from_right",
                headerTintColor: theme.colors.white,
                headerStyle: { backgroundColor: theme.colors.primary },
            }}
        >
            <Stack.Screen
                name="HomeCash"
                component={HomeCash}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="Operation" component={Operation} />
        </Stack.Navigator>
    );
};

export const AppRoutes: React.FunctionComponent = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Drawer.Screen
                name="HomeRoutes"
                component={HomeRoutes}
                options={{ title: "Início" }}
            />

            <Drawer.Screen
                name="ProfileRoutes"
                component={ProfileRoutes}
                options={{ title: "Dados do usuário" }}
            />

            <Drawer.Screen
                name="CashSimulationRoutes"
                component={CashSimulationRoutes}
                options={{ title: "Simulação de Caixa" }}
            />
        </Drawer.Navigator>
    );
};
