import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Contract() {

    const [text, setText] = useState('');

    return (
        <View style={styles.container}>
            <Text>Termos de contrato</Text>
            <Text>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ADD8E6'
    }
})