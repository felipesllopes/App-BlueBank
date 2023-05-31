import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/main/login';
import Register from '../pages/main/register';

export default function Routes() {

    const Stack = createNativeStackNavigator();

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