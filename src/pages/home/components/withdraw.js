import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import firebase from "../../../firebase/firebaseConnection";

export default function Withdraw() {

    const route = useRoute();

    const keyUser = route.params?.keyUser;
    const [withdraw, setWithdraw] = useState('');
    const [balance, setBalance] = useState();

    let valor = parseInt(withdraw);

    useEffect(() => {
        firebase.database().ref('usuario').child(keyUser).on('value', (snapshop) => {
            setBalance(snapshop.val().saldo);
        })
    }, [])


    async function Withdraw() {

        if (valor <= 0) {
            alert("Operação inválida. Digite um valor válido.")
            setWithdraw('')
            return;
        }

        if (valor > balance) {
            alert("Você não tem saldo suficiente para realizar saque neste valor.");
            return;
        }

        await firebase.database().ref('usuario').child(keyUser).update({
            saldo: (balance - valor),
        })
            .then(() => {
                alert(`Saque de R$${valor.toFixed(2)} realizado com sucesso!`)
                setWithdraw('');
            })
            .catch((error) => {
                alert('Ocorreu um erro inesperado');
                console.log(error)
                return;
            })
    }


    return (
        <View style={styles.container}>

            {balance &&
                <View style={styles.viewBox}>
                    <Text style={styles.text}>Saldo atual: R${balance.toFixed(2)}</Text>
                </View>
            }

            <View style={styles.viewBox}>
                <Text style={styles.text}>Valor: R$</Text>
                <TextInput
                    style={styles.textinput}
                    value={withdraw}
                    onChangeText={(text) => setWithdraw(text)}
                    keyboardType="numeric"
                />
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={Withdraw} activeOpacity={0.7}>
                <Text style={styles.logoutText}>Sacar</Text>
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