import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from '../../../context/auth';
import firebase from '../../../firebase/firebaseConnection';

export default function Transfer() {

    const { user } = useContext(AuthContext);

    const [value, setValue] = useState('');
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        (async () => {
            firebase.database().ref('usuario').child(await user.uid).on('value', (snapshop) => {
                setBalance(snapshop.val().saldo);
            })

        })();
        console.log("R$" + balance.toFixed(2))
        console.log(user)
    }, [])

    async function handleTransfer() {

    }


    return (
        <View style={styles.container}>

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

            <TouchableOpacity style={styles.logoutButton} onPress={handleTransfer} activeOpacity={0.7}>
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