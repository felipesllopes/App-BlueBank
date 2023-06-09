import FontAwesome from '@expo/vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from '../../context/auth';
import firebase from '../../firebase/firebaseConnection';
import ListTransactions from './listtransactions';

export default function HistoricTransation() {

    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newDate, setNewDate] = useState(new Date());
    const [show, setShow] = useState(false);

    useEffect(() => {
        (async () => {
            firebase.database().ref('transacoes').child(await user.uid)
                .orderByChild('data').equalTo(format(newDate, 'dd/MM/yyyy')).on('value', (snapshot) => {

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
        setLoading(false)
    }, [newDate]);

    function openDate() {
        setShow(true);
    }

    function closeDate(event, date) {
        setShow(false);
        setLoading(true);
        if (date) {
            setNewDate(date);
        }
    }

    function renderItem({ item }) {
        return <ListTransactions data={item} />
    }

    function listEmptyComponent() {
        return (<Text style={styles.notResult}>Não foi realizada nenhuma transação nesta data.</Text>);
    }

    return (
        <View style={styles.container}>

            <View style={styles.boxtittle}>
                <Text style={styles.tittle}>Histórico de transações</Text>

                <TouchableOpacity onPress={openDate}>
                    <FontAwesome name="calendar" size={30} color={'#000'} />
                </TouchableOpacity>
            </View>

            <Text style={styles.date}>{format(newDate, 'dd/MM/yyyy')}</Text>

            <View style={styles.box}>
                {loading ?
                    <ActivityIndicator size={30} color={'black'} style={styles.loadingActivity} />
                    :
                    <FlatList
                        style={{ margin: 5 }}
                        data={transactions}
                        renderItem={renderItem}
                        ListEmptyComponent={() => listEmptyComponent()}
                    />
                }
            </View>

            {show &&
                <DateTimePicker
                    value={newDate}
                    mode='date'
                    display='default'
                    onChange={closeDate}
                    maximumDate={new Date()}
                />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',
        alignItems: 'center',
    },
    box: {
        backgroundColor: '#FFF',
        height: '85%',
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
    boxtittle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    date: {
        textAlign: 'center',
        marginBottom: 3,
        fontSize: 19,
        backgroundColor: '#F5F5F5',
        width: 150,
        borderRadius: 5,
        borderWidth: 2,
        textAlignVertical: 'center',
    },
    loadingActivity: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notResult: {
        fontSize: 17,
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 20,
        color: '#333'
    }
})