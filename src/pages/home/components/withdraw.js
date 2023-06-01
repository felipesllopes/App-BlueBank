import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Withdraw() {

    const [balance, setBalance] = useState(7325.90);

    return (
        <View style={styles.container}>
            <Text>Saldo disponível: R${balance.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    }
})