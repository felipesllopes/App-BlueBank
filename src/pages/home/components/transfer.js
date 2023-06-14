import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import firebase from "../../../firebase/firebaseConnection";

export default function Transfer() {

    const route = useRoute();

    const keyUser = route.params?.keyUser;
    const [transfer, setTransfer] = useState('');
    const [balance, setBalance] = useState(null);
    // let valor = parseFloat(transfer);

    useEffect(() => {
        // firebase.database().ref('usuario').child(keyUser).on('value', (snapshop) => {
        //     setBalance(snapshop.val().saldo);
        // })
    }, [])

    async function Transfer() {

        // if (valor <= 0) {
        //     alert("Operação inválida. Digite um valor válido.")
        //     setTransfer('')
        //     return;
        // }

        // if (valor > balance) {
        //     alert("Você não tem saldo suficiente para realizar transferência neste valor.");
        //     setTransfer('');
        //     return;
        // }

        // if (transfer === "") {
        //     alert("Digite o valor da transferência")
        //     return;
        // }

        // alert("Transação realizada com sucesso!")
        // Keyboard.dismiss();
        // setTransfer('');
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
                    value={transfer}
                    onChangeText={(text) => setTransfer(text)}
                    keyboardType="numeric"
                />
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={Transfer} activeOpacity={0.7}>
                <Text style={styles.logoutText}>Transferir</Text>
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