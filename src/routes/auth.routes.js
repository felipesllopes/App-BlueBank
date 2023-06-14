import Login from "../pages/main/login";
import Register from "../pages/main/register";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
    return (
        <Stack.Navigator>

            <Stack.Screen name='Login' component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen name='Register' component={Register}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}