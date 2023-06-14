import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Logout from "../Logout";
import Profile from "../pages/Profile";
import HomeRoutes from "./home.routes";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Stack = createBottomTabNavigator();

export default function AppRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                tabBarActiveBackgroundColor: '#E0FFFF',
                tabBarStyle: { borderTopWidth: 0 }
            }}
        >

            <Stack.Screen name="HomeRoutes" component={HomeRoutes}
                options={{
                    headerShown: false, title: 'Início',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={30} color={'#0000CD'} />
                    )
                }}
            />

            <Stack.Screen name="Profile" component={Profile}
                options={{
                    headerShown: false, title: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" size={30} color={'#0000CD'} />
                    )
                }}
            />

            <Stack.Screen name="Logout" component={Logout}
                options={{
                    headerShown: false, title: 'Sair',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="sign-out" size={30} color={'#0000CD'} />
                    )
                }}
            />

        </Stack.Navigator>
    )
}