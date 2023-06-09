import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../pages/Profile";
import EditProfile from "../pages/Profile/editProfile";

export default function ProfileRoutes() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: '#FFF',
                headerStyle: { backgroundColor: '#0000CD' },
            }}
        >

            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false, }} />

            <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Voltar' }} />

        </Stack.Navigator>
    )
}