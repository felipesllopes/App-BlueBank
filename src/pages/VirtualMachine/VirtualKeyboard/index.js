import { useContext } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../../context/auth";

export default function VirtualKeyboard({ deliveryValue, array, clear, cancel, balance, withdrawOption }) {

    const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '']
    const { withdraw, deposit } = useContext(AuthContext);

    function enter() {

        const arr = array.join('');
        const arr2 = parseInt(arr)

        if (array.length === 0) {
            return;
        }

        if (withdrawOption) {
            withdraw(arr2, balance);
        } else {
            deposit(arr2, balance);
        }
        clear();
    }

    // Essa função pega o valor na função lisKeyBoard e passa o valor pra função VirtualMachine
    function searchValue(valor) {
        deliveryValue(valor)
    }

    function renderKeyboard({ item }) {
        return (
            <TouchableOpacity activeOpacity={item === '' ? 1 : 0.7} onPress={() => searchValue(item)}>
                <View style={styles.container2}>
                    <Text style={styles.keyboard2}>{item}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={key}
                renderItem={renderKeyboard}
                numColumns={3}
            />

            <View>
                <TouchableOpacity
                    onPress={() => cancel()}
                    activeOpacity={0.5}
                    style={[styles.keyboard, { backgroundColor: 'red' }]}
                >
                    <Text style={styles.value}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => clear()}
                    activeOpacity={0.5}
                    style={[styles.keyboard, { backgroundColor: 'yellow' }]}
                >
                    <Text style={styles.value}>Clear</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={enter}
                    activeOpacity={0.5}
                    style={[styles.keyboard, { backgroundColor: 'green' }]}
                >
                    <Text style={styles.value}>Enter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.keyboard}
                >
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
    },


    container2: {
        backgroundColor: '#AAA',
        width: 80,
        height: 66,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        borderWidth: 2,
        borderRadius: 7
    },
    keyboard2: {
        fontSize: 30,
        fontWeight: 'bold',
    }
})