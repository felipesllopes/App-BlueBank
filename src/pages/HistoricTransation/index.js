import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from '../../context/auth';
import firebase from '../../firebase/firebaseConnection';
import ListTransactions from './listtransactions';

export default function HistoricTransation() {

    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        (async () => {
            firebase.database().ref('transacoes').child(await user.uid).on('value', (snapshot) => {

                setTransactions([]);

                snapshot.forEach((childIten) => {
                    let list = {
                        type: childIten.val().tipo,
                        value: childIten.val().valor,
                        date: childIten.val().data,
                        balance: childIten.val().saldo,
                    }
                    setTransactions(oldArray => [...oldArray, list]);
                })
            })
        })();
    }, [])

    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.tittle}>Histórico de transações</Text>

                <TouchableOpacity>
                    <FontAwesome name="calendar" size={30} color={'#000'} />
                </TouchableOpacity>
            </View>

            <View style={styles.box}>
                <FlatList
                    inverted={true} // inverter a ordem de exibição dos elementos (a ordem é invertida no firebase)
                    style={{ margin: 5 }}
                    data={transactions}
                    renderItem={({ item }) => (<ListTransactions data={item} />)}
                />
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
        marginVertical: 15,
        marginRight: 20,
    },
})