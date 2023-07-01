import { StyleSheet, Text, View } from "react-native";

export default function ListTransactions({ data }) {
    return (
        <View style={styles.container}>

            {data &&
                <View style={styles.box}>
                    <Text style={styles.type}>{data.type}</Text>

                    <Text style={[styles.value, { color: data.type === 'Saque' ? 'red' : 'green' }]}>
                        {data.type === 'Saque' ? '-' : '+'} R${(data.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>

                    <Text style={styles.balance}> - R${(data.balance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
                </View>
            }

            <Text style={styles.date}>{data.date}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        paddingVertical: 10,
    },
    box: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    type: {
        fontWeight: 'bold',
        color: '#555',
    },
    value: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    balance: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    date: {
        fontStyle: 'italic',
    }
})