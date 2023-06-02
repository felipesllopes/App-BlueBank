import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/home';
import Contract from '../pages/home/components/contract';
import Payment from '../pages/home/components/payment';
import Pix from '../pages/home/components/pix';
import Transfer from '../pages/home/components/transfer';
import Withdraw from '../pages/home/components/withdraw';
import Login from '../pages/main/login';
import Register from '../pages/main/register';
import Deposit from '../pages/home/components/deposit';

export default function Routes() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>

            <Stack.Screen name='Login' component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen name='Home' component={Home}
                options={{ headerShown: false }}
            />

            <Stack.Screen name='Register' component={Register}
                options={{ headerShown: false }}
            />

            <Stack.Screen name='Payment' component={Payment} options={{ title: 'Pagamento' }} />

            <Stack.Screen name='Pix' component={Pix} />

            <Stack.Screen name='Transfer' component={Transfer} options={{ title: 'Transferência' }} />

            <Stack.Screen name='Withdraw' component={Withdraw} options={{ title: 'Saque' }} />

            <Stack.Screen name='Deposit' component={Deposit} options={{ title: 'Depósito' }} />

            <Stack.Screen name='Contract' component={Contract} options={{ title: 'Contrato' }} />

        </Stack.Navigator>
    )
}