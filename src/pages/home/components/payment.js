import { View, Text, StyleSheet } from "react-native";

export default function Payment() {
    return (
        <View style={styles.container}>
            <Text>Pagamento</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    }
})