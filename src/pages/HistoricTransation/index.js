import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HistoricTransation() {
    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.tittle}>Histórico de transação</Text>

                <TouchableOpacity>
                    <FontAwesome name="calendar" size={30} color={'#000'} />
                </TouchableOpacity>
            </View>

            <View style={styles.box}>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',
    },
    box: {
        backgroundColor: '#FFF',
        height: '90%',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 20,
    },
    tittle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 10,
        marginRight: 20,
    },
})