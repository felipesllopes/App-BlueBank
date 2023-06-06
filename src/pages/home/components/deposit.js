import { View, Text, StyleSheet, TextInput } from "react-native";
import firebase from "../../../firebase/firebaseConnection";
import { useRoute } from '@react-navigation/native'
import { useState } from "react";
import { Button } from "react-native";

export default function Deposit() {

    const route = useRoute();

    const [keyUser, setKeyUser] = useState();
    const [balance, setBalance] = useState(0);

    async function deposit() {

        let valor = parseInt(balance)
        setKeyUser(await route.params?.keyUser)

        // await firebase.database().ref('usuario').child(keyUser).update({
        //     saldo: valor,
        // })
        //     .then(() => {
        //         alert("Depósito realizado com sucesso!")
        //         setBalance(0);
        //     })
        alert(route.params?.keyUser)
    }

    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                <Text>Valor: R$</Text>
                <TextInput
                    style={{ borderWidth: 2, width: 120, marginLeft: 10 }}
                    value={balance}
                    onChangeText={(value) => setBalance(value)}
                    keyboardType="numeric"
                />

            </View>

            <Text>{balance}</Text>

            <Button title="Depositar" onPress={deposit} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    }
})