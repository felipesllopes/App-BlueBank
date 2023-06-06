import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import firebase from "../../../firebase/firebaseConnection";

export default function Deposit() {

    const route = useRoute();

    const keyUser = route.params?.keyUser;
    const [balance, setBalance] = useState('');
    const [oldBalance, setOldBalance] = useState();
    let valor = parseInt(balance);

    useEffect(() => {
        firebase.database().ref('usuario').child(keyUser).on('value', (snapshop) => {
            setOldBalance(snapshop.val().saldo);
        })

    }, [])


    async function deposit() {

        if (balance === '') {
            alert("Digite o valor a ser depositado");
            return;
        }

        if (valor <= 0) {
            alert("Digite um valor válido");
            return;
        }

        await firebase.database().ref('usuario').child(keyUser).update({
            saldo: valor + oldBalance,
        })
            .then(() => {
                alert(`Depósito de R$${valor.toFixed(2)} realizado com sucesso!`)
                setBalance('');
            })
            .catch((error) => {
                alert('Ocorreu um erro inesperado');
                console.log(error)
                return;
            })
    }


    return (
        <View style={styles.container}>

            {oldBalance &&
                <View style={styles.viewBox}>
                    <Text style={styles.text}>Saldo atual: R${oldBalance.toFixed(2)}</Text>
                </View>
            }

            <View style={styles.viewBox}>
                <Text style={styles.text}>Valor: R$</Text>
                <TextInput
                    style={styles.textinput}
                    value={balance}
                    onChangeText={(text) => setBalance(text)}
                    keyboardType="numeric"
                />
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={deposit} activeOpacity={0.7}>
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