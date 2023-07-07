import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ListKeyBoard from "./listkeyboard";

export default function Boxkeyboard() {

    const [key, setKey] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''])
    const [operation, setOperation] = useState(['Cancel', 'Clear', 'Enter', ''])
    const [value, setValue] = useState();

    function renderKeyboard({ item }) {
        return (<ListKeyBoard data={item} />)
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={key}
                renderItem={renderKeyboard}
                numColumns={3}
            />

            <View>
                <TouchableOpacity activeOpacity={0.5} style={[styles.keyboard, { backgroundColor: 'red' }]}>
                    <Text style={styles.value}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} style={[styles.keyboard, { backgroundColor: 'yellow' }]}>
                    <Text style={styles.value}>Clear</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} style={[styles.keyboard, { backgroundColor: 'green' }]}>
                    <Text style={styles.value}>Enter</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} style={styles.keyboard}>
                    <Text style={styles.value}></Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#DDD',
        paddingHorizontal: 5,
        paddingVertical: 20
    },
    keyboard: {
        backgroundColor: '#AAA',
        width: 100,
        height: 66,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        borderWidth: 2,
        borderRadius: 7
    },
    value: {
        fontSize: 23,
        fontWeight: 'bold',
    }
})