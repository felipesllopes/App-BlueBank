import { View, Text, StyleSheet } from "react-native";

export default function Deposit() {
    return (
        <View style={styles.container}>
            <Text>Depósito</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    }
})