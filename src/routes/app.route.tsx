import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { CustomDrawer } from "../components/CustomDrawer";
import theme from "../global/styles/theme";
import { Boleto } from "../pages/Boleto";
import { Cartao } from "../pages/Cartao";
import { HomeCash } from "../pages/CashSimulation/HomeCash";
import { Operation } from "../pages/CashSimulation/Operation";
import { Contrato } from "../pages/Contract";
import { Fatura } from "../pages/Fatura";
import { Help as Ajuda } from "../pages/Help";
import { Home } from "../pages/Home";
import { Investimento } from "../pages/Investimento";
import { Negociacao } from "../pages/Negotiation";
import { ConfirmPix } from "../pages/Pix/ConfirmPix";
import { Pix } from "../pages/Pix/Home";
import { PayPix } from "../pages/Pix/PayPix";
import { PaymentVoucher } from "../pages/Pix/PaymentVoucher";
import { Poupanca } from "../pages/Poupanca";
import { Profile } from "../pages/Profile";
import { Qr_Code } from "../pages/Qr_Code";
import { Recarga } from "../pages/Recarga";
import { Transacoes } from "../pages/Transactions";
import { TransactionsDetails } from "../pages/Transactions/TransactionsDetails";
import { Transferencia } from "../pages/Transferencia";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export const TabRoutes: React.FunctionComponent = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarInactiveBackgroundColor: theme.colors.primary,
                tabBarActiveBackgroundColor: theme.colors.primary,
                tabBarActiveTintColor: theme.colors.accent,
                tabBarInactiveTintColor: theme.colors.white,
                tabBarStyle: { borderTopWidth: 0 },
                tabBarLabelStyle: { fontSize: 11 },
            }}
        >
            <Tab.Screen
                name="AppRoutes"
                component={AppRoutes}
                options={{
                    title: "Início",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Qr_Code"
                component={Qr_Code}
                options={{
                    title: "QR Code",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="qr-code" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

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
                name="Transacoes"
                component={Transacoes}
                options={{ title: "Transações" }}
            />

            <Stack.Screen
                name="Cartao"
                component={Cartao}
                options={{ title: "Cartões" }}
            />

            <Stack.Screen name="Fatura" component={Fatura} />

            <Stack.Screen name="Recarga" component={Recarga} />

            <Stack.Screen name="Pix" component={Pix} />

            <Stack.Screen name="Boleto" component={Boleto} />

            <Stack.Screen
                name="Transferencia"
                component={Transferencia}
                options={{ title: "Transferência" }}
            />

            <Stack.Screen
                name="Poupanca"
                component={Poupanca}
                options={{ title: "Poupança" }}
            />

            <Stack.Screen
                name="Investimento"
                component={Investimento}
                options={{ title: "Investimentos" }}
            />

            <Stack.Screen
                name="Negociacao"
                component={Negociacao}
                options={{ title: "Negociação" }}
            />

            <Stack.Screen name="Ajuda" component={Ajuda} />

            <Stack.Screen
                name="Contrato"
                component={Contrato}
                options={{ title: "Contrato" }}
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
                name="CashSimulationRoutes"
                component={CashSimulationRoutes}
                options={{ title: "Caixa eletrônico" }}
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
                headerShown: false,
            }}
        >
            <Stack.Screen name="HomeCash" component={HomeCash} />

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
        </Drawer.Navigator>
    );
};
