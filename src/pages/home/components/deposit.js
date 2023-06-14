import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import firebase from "../../../firebase/firebaseConnection";

export default function Deposit() {

    const route = useRoute();

    const keyUser = route.params?.keyUser;
    const [deposit, setDeposit] = useState('');
    const [balance, setBalance] = useState(null);
    // let valor = parseFloat(deposit);

    useEffect(() => {
        // firebase.database().ref('usuario').child(keyUser).on('value', (snapshop) => {
        //     setBalance(snapshop.val().saldo);
        // })
    }, [])

    async function Deposit() {

        // if (deposit === '') {
        //     alert("Digite o valor a ser depositado");
        //     return;
        // }

        // if (valor <= 0) {
        //     alert("Digite um valor válido");
        //     return;
        // }

        // await firebase.database().ref('usuario').child(keyUser).update({
        //     saldo: valor + balance,
        // })
        //     .then(() => {
        //         alert(`Depósito de R$${valor.toFixed(2)} realizado com sucesso!`)
        //         setDeposit('');
        //         Keyboard.dismiss();
        //     })
        //     .catch((error) => {
        //         alert('Ocorreu um erro inesperado');
        //         console.log(error)
        //         return;
        //     })
    }


    return (
        <View style={styles.container}>

            <View style={styles.viewBox}>
                {balance === null ?
                    <Text />
                    :
                    <Text style={styles.text}>Saldo atual: R${balance}</Text>
                }
            </View>

            <View style={styles.viewBox}>
                <Text style={styles.text}>Valor: R$</Text>
                <TextInput
                    style={styles.textinput}
                    value={deposit}
                    onChangeText={(text) => setDeposit(text)}
                    keyboardType="numeric"
                />
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={Deposit} activeOpacity={0.7}>
                <Text style={styles.logoutText}>Depositar</Text>
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
    viewBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 4,
    },
    text: {
        fontSize: 19,
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