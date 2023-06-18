import FontAwesome from "@expo/vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HistoricTransation from "../pages/HistoricTransation";
import HomeRoutes from "./home.routes";
import ProfileRoutes from "./profile.routes";

const Stack = createBottomTabNavigator();

export default function AppRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                tabBarActiveBackgroundColor: '#E0FFFF',
                tabBarStyle: { borderTopWidth: 0, },
                tabBarInactiveTintColor: '#000',
            }}
        >

            <Stack.Screen name="HomeRoutes" component={HomeRoutes}
                options={{
                    headerShown: false, title: 'Início',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={35} color={'#0000CD'} />
                    )
                }}
            />

            <Stack.Screen name="HistoricTransation" component={HistoricTransation}
                options={{
                    headerShown: false, title: 'Transações',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="money" size={35} color={'#0000CD'} />
                    )
                }}
            />

            <Stack.Screen name="ProfileRoutes" component={ProfileRoutes}
                options={{
                    headerShown: false, title: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" size={35} color={'#0000CD'} />
                    )
                }}
            />


        </Stack.Navigator>
    )
}