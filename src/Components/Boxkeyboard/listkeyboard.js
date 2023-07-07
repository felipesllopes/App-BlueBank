import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ListKeyBoard({ data }) {

    const [value, setValue] = useState();

    function captured(data) {
        if (data === '') {
            return;
        }
        setValue(data)
        console.log(data)
    }

    return (
        <TouchableOpacity activeOpacity={data === '' ? 1 : 0.5} onPress={() => captured(data)}>
            <View style={styles.container}>
                <Text style={styles.keyboard}>{data}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#AAA',
        width: 80,
        height: 66,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        borderWidth: 2,
        borderRadius: 7
    },
    keyboard: {
        fontSize: 30,
        fontWeight: 'bold',
    }
})