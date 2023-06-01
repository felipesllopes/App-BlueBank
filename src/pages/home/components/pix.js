import { View, Text, StyleSheet } from "react-native";

export default function Pix() {
    return (
        <View style={styles.container}>
            <Text>Pix</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    }
})