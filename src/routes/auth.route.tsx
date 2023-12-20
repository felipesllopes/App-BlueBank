import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import theme from "../global/styles/theme";
import { Login } from "../pages/Login";
import { ResetPassword } from "../pages/RecoverPassword";
import { Register } from "../pages/Register";

const Stack = createNativeStackNavigator();

export const AuthRoutes: React.FunctionComponent = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: "slide_from_right",
                headerTintColor: theme.colors.white,
                headerStyle: { backgroundColor: theme.colors.darkBlue },
            }}
        >
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{ title: "Voltar" }}
            />
        </Stack.Navigator>
    );
};
