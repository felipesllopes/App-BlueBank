import { Picker } from '@react-native-picker/picker';
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from '../../../context/auth';
import firebase from '../../../firebase/firebaseConnection';

export default function Pix() {

    const { user, userList, pix } = useContext(AuthContext);
    const userList2 = userList && userList;

    const [value, setValue] = useState('');
    const [balance, setBalance] = useState(0);
    const [users, setUsers] = useState(0);

    useEffect(() => {
        (async () => {
            firebase.database().ref('usuario').child(await user.uid).on('value', (snapshop) => {
                setBalance(snapshop.val().saldo);
            })
        })();
        setValue('');
        setUsers(0);
    }, [balance])

    async function handleTransfer() {
        let destinatary = userList2[users];
        let valor = value;
        pix(destinatary, valor, balance);
    }


    return (
        <View style={styles.container}>

            <View style={styles.container2}>
                <View style={styles.viewBox}>
                    <Text style={styles.text}>Saldo atual: R${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
                </View>

                <View style={styles.viewPicker}>
                    <Picker
                        style={{ justifyContent: 'center' }}
                        selectedValue={users}
                        onValueChange={(item, index) => { setUsers(item) }}
                    >
                        {userList2.map((v, k) => {
                            return <Picker.Item
                                key={k}
                                value={k}
                                label={v.cpf == undefined ? `${v.nome}` : `${v.nome} - CPF: ${v.cpf}`}
                                enabled={k !== 0}
                            />
                        })}
                    </Picker>
                </View>

                <Text style={[styles.destinatary, { display: users != 0 ? 'flex' : 'none' }]}>
                    {userList2[users].nome} {userList2[users].sobrenome} {userList2[users].cpf && '- CPF: ' + userList2[users].cpf}
                </Text>

                <View style={[styles.viewBox, { display: users != 0 ? 'flex' : 'none' }]}>
                    <Text style={styles.text}>Valor: R$</Text>
                    <TextInput
                        style={styles.textinput}
                        value={value}
                        onChangeText={(text) => setValue(text)}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.viewButton}>
                    <TouchableOpacity
                        style={[styles.button, { display: value != 0 ? 'flex' : 'none' }]}
                        onPress={() => { setValue(''); setUsers(0) }}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.textButton}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, { display: value != 0 ? 'flex' : 'none' }]} onPress={handleTransfer} activeOpacity={0.7}>
                        <Text style={styles.textButton}>Enviar</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ADD8E6',
        paddingTop: 30,
    },
    container2: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        margin: 10,
        paddingVertical: 30,
        marginHorizontal: 20,
    },
    viewPicker: {
        backgroundColor: '#F9F9F9',
        alignSelf: 'center',
        width: 180,
        height: 44,
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
    },
    viewBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    destinatary: {
        fontSize: 17,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    text: {
        fontSize: 19,
    },
    textinput: {
        borderBottomWidth: 2,
        width: 120,
        marginLeft: 10,
        padding: 4,
        fontSize: 18,
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        paddingLeft: 10,
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#0000CD',
        paddingVertical: 4,
        borderRadius: 10,
        marginTop: 40,
        width: 120,
    },
    textButton: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
    }
})