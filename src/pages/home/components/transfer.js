import { StyleSheet, Text, View } from "react-native";

export default function Transfer() {
    return (
        <View style={styles.container}>
            <Text>Transferência</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    }
})