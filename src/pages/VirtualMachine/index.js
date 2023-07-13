import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../context/auth";
import firebase from "../../firebase/firebaseConnection";
import VirtualKeyboard from "./VirtualKeyboard";

export default function VirtualMachine() {

    const { user } = useContext(AuthContext);
    const [value, setValue] = useState([]);
    const [withdraw, setWithdraw] = useState(false);
    const [deposit, setDeposit] = useState(false);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        firebase.database().ref('usuario').child(user.uid).on('value', (snapshot) => {
            setBalance((snapshot.val().saldo));
        })
    }, [])

    // Essa função pegará o valor na função VirtualKeyboard
    function searchValue(valor) {
        // o usuário só poderá digitar o valor se estiver ativa a tela de saque ou depósito
        if (withdraw || deposit) {
            if (value.indexOf(0) === 0) {
                value.shift();
            }
            setValue(push => [...push, valor])
        }
    }

    function clear() {
        if (value.length != 0) {
            setValue([]);
        }
    }

    function cancel() {
        if (withdraw || deposit) {
            setWithdraw(false);
            setDeposit(false);
            setValue([])
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.tittle}>CAIXA ELETRÔNICO
                    {withdraw && <Text> | SAQUE</Text>}
                    {deposit && <Text> | DEPÓSITO</Text>}
                </Text>
            </View>

            <View style={styles.body}>

                <View style={[styles.viewButtons, { display: withdraw || deposit ? 'none' : 'flex' }]}>
                    <TouchableOpacity
                        onPress={() => setWithdraw(true)}
                        activeOpacity={1}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>Saque</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setDeposit(true)}
                        activeOpacity={1}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>Depósito</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.boxValue, { display: withdraw || deposit ? 'flex' : 'none' }]}>
                    <Text style={styles.value}>Saldo disponível: R${balance && balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        {withdraw && <Text style={styles.value}>R$</Text>}
                        {deposit && <Text style={styles.value}>R$</Text>}
                        <View style={styles.background}>
                            <Text style={styles.valueInput}>{value}</Text>
                        </View>
                    </View>
                </View>

            </View>

            <View style={{ position: 'absolute', width: '100%', bottom: 20 }}>
                <VirtualKeyboard
                    deliveryValue={searchValue}
                    array={value}
                    clear={clear}
                    cancel={cancel}
                    balance={balance}
                    withdrawOption={withdraw}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDD'
    },
    header: {
        backgroundColor: '#0000CD',
        height: 50,
    },
    tittle: {
        flex: 1,
        fontSize: 20,
        color: '#FFF',
        textAlignVertical: 'center',
        marginLeft: 10,
    },
    body: {
        backgroundColor: '#ADD8E6',
        height: '45%',
    },
    viewButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 125,
    },
    button: {
        backgroundColor: '#0000CD',
        paddingHorizontal: 20,
        borderColor: '#0000CD',
        borderRadius: 10,
        paddingVertical: 4,
        width: 180
    },
    textButton: {
        fontSize: 26,
        color: '#FFF',
        textAlign: 'center',
    },
    boxValue: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    value: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    field: {
        backgroundColor: '#FFF',
        width: 120,
        borderWidth: 2,
        borderColor: '#0000CD',
        borderRadius: 6,
        marginLeft: 10,
        height: 40,
    },
    background: {
        backgroundColor: '#FFF',
        width: 100,
        height: 40,
        borderWidth: 2,
        borderColor: '#0000CD',
        borderRadius: 6,
        marginLeft: 1,
    },
    valueInput: {
        fontSize: 22,
        flex: 1,
        textAlignVertical: 'center',
        marginHorizontal: 5,
    }
})