import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Cards } from "../pages/Cards";
import { Home } from "../pages/Home";
import { Payment } from "../pages/Payment";
import { Pix } from "../pages/Pix";
import { Transactions } from "../pages/Transactions";
import { Transfers } from "../pages/Transfers";
import { Deposit } from "../pages/Deposit";

const Stack = createNativeStackNavigator();

export const AppRoutes: React.FunctionComponent = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Pix"
                component={Pix}
                options={{ title: "PIX" }}
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
        </Stack.Navigator>
    );
};
