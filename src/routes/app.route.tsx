import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import theme from "../global/styles/theme";
import { Cards } from "../pages/Cards";
import { Contract } from "../pages/Contract";
import { Deposit } from "../pages/Deposit";
import { Help } from "../pages/Help";
import { Home } from "../pages/Home";
import { Payment } from "../pages/Payment";
import { ConfirmPix } from "../pages/Pix/ConfirmPix";
import { Pix } from "../pages/Pix/Home";
import { PayPix } from "../pages/Pix/PayPix";
import { PaymentVoucher } from "../pages/Pix/PaymentVoucher";
import { Transactions } from "../pages/Transactions";
import { Transfers } from "../pages/Transfers";
import { TransactionsDetails } from "../pages/Transactions/TransactionsDetails";

const Stack = createNativeStackNavigator();

export const AppRoutes: React.FunctionComponent = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: "slide_from_right",
                headerTintColor: theme.colors.white,
                headerStyle: { backgroundColor: theme.colors.darkBlue },
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
                name="Cards"
                component={Cards}
                options={{ title: "Cartões" }}
            />

            <Stack.Screen
                name="Deposit"
                component={Deposit}
                options={{ title: "Depósito" }}
            />

            <Stack.Screen
                name="Payment"
                component={Payment}
                options={{ title: "Pagamento" }}
            />

            <Stack.Screen
                name="Transfers"
                component={Transfers}
                options={{ title: "Transferência" }}
            />

            <Stack.Screen
                name="Transactions"
                component={Transactions}
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
        </Stack.Navigator>
    );
};
