import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/home';
import Contract from '../pages/home/components/contract';
import Payment from '../pages/home/components/payment';
import Pix from '../pages/home/components/pix';
import Transfer from '../pages/home/components/transfer';

export default function HomeRoutes() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: '#0000CD',
                headerStyle: { backgroundColor: '#FFF' },
            }}
        >

            <Stack.Screen name='Home' component={Home}
                options={{ headerShown: false }}
            />

            <Stack.Screen name='Payment' component={Payment} options={{ title: 'Pagamento' }} />

            <Stack.Screen name='Pix' component={Pix} />

            <Stack.Screen name='Transfer' component={Transfer} options={{ title: 'Transferência' }} />

            <Stack.Screen name='Contract' component={Contract} options={{ title: 'Contrato' }} />

        </Stack.Navigator>
    )
}