import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from '../../context/auth';
import firebase from '../../firebase/firebaseConnection';
import ListTransactions from './listtransactions';
import { Alert } from 'react-native';

export default function HistoricTransation() {

    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const focused = useIsFocused();
    const [array, setArray] = useState([]);

    useEffect(() => {
        (async () => {
            await firebase.database().ref('transacoes').child(await user.uid).orderByChild('data').once('value')
                .then((snapshot) => {
                    // setLoading(true)

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
                .then(() => {
                    setArray(transactions.slice().reverse())
                    setLoading(false);
                })
                .catch((error) => {
                    Alert.alert(
                        'Erro!',
                        'Um imprevisto aconteceu. Tente novamente mais tarde!'
                    )
                    console.log(error)
                })
        })();

        console.log(array)
    }, [focused]);

    function renderItem({ item }) {
        return <ListTransactions data={item} />
    }

    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                <Text style={styles.tittle}>Histórico de transações</Text>

                <TouchableOpacity>
                    <FontAwesome name="calendar" size={30} color={'#000'} />
                </TouchableOpacity>
            </View>

            <View style={styles.box}>
                {loading ?
                    <ActivityIndicator size={30} color={'black'} style={styles.loadingActivity} />
                    :
                    <FlatList
                        style={{ margin: 5 }}
                        data={array}
                        renderItem={renderItem}
                    />
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',
    },
    tittle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 15,
        marginRight: 20,
    },
    box: {
        backgroundColor: '#FFF',
        height: '90%',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 20,
    },
    loadingActivity: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})