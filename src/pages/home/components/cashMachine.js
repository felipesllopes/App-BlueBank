import { useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState, } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from '../../../context/auth';
import firebase from "../../../firebase/firebaseConnection";

export default function CashMachine() {

    const route = useRoute();
    const { user, deposit, withdraw } = useContext(AuthContext);
    const [value, setValue] = useState('');
    const [balance, setBalance] = useState(0);
    const [type, setType] = useState(route.params?.type);

    useEffect(() => {
        (async () => {
            firebase.database().ref('usuario').child(await user.uid).on('value', (snapshop) => {
                setBalance(snapshop.val().saldo);
            })
        })()
    }, [])

    /**
     * Function to define which operation to perform. Withdrawal or Deposit.
     */
    async function handleOperation() {
        if (type === 'deposit') {
            deposit(value, balance);
        }
        if (type === 'withdraw') {
            withdraw(value, balance);
        }
        setValue('');
        Keyboard.dismiss();
    }


    return (
        <View style={styles.container}>

            <View style={styles.box}>
                <View style={styles.viewBox}>
                    <Text style={styles.text}>Saldo atual: R${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
                </View>

                <View style={styles.viewBox}>
                    <Text style={styles.text}>Valor: R$</Text>
                    <TextInput
                        style={styles.textinput}
                        value={value}
                        onChangeText={(text) => setValue(text)}
                        keyboardType="numeric"
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleOperation} activeOpacity={0.7}>
                <Text style={styles.logoutText}>{type === 'deposit' ? 'Depositar' : 'Sacar'}</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ADD8E6',
        paddingTop: 30,
    },
    box: {
        backgroundColor: '#F5F5F5',
        margin: 20,
        marginHorizontal: 40,
        paddingVertical: 30,
        borderRadius: 10,
        borderWidth: 2
    },
    viewBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 4,
    },
    text: {
        fontSize: 19,
        marginVertical: 5,
    },
    textinput: {
        borderWidth: 2,
        width: 120,
        marginLeft: 10,
        padding: 4,
        fontSize: 18,
        backgroundColor: 'white',
    },
    logoutButton: {
        backgroundColor: '#0000CD',
        paddingVertical: 4,
        borderRadius: 10,
        marginTop: 40,
    },
    logoutText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
    }
})