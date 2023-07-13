import { Picker } from '@react-native-picker/picker';
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from '../../../context/auth';
import firebase from '../../../firebase/firebaseConnection';

export default function Pix() {

    const { user, pix } = useContext(AuthContext);

    const [value, setValue] = useState('');
    const [balance, setBalance] = useState(0);
    const [position, setPosition] = useState(0);
    const [listUsers, setListUsers] = useState([])

    useEffect(() => {
        (async () => {
            firebase.database().ref('usuario').child(await user.uid).on('value', (snapshop) => {
                setBalance(snapshop.val().saldo);
            })

            firebase.database().ref('usuario').on('value', (snapshot) => {
                let atualUser = user && user.uid;
                const firstLabel = [{ nome: 'Destinatário' }]; // 1º label
                snapshot.forEach((childSnapShot) => {
                    let data = {
                        saldo: childSnapShot.val().saldo,
                        nome: childSnapShot.val().nome,
                        sobrenome: childSnapShot.val().sobrenome,
                        cpf: childSnapShot.val().cpf,
                        chave: childSnapShot.key
                    }
                    if (atualUser !== data.chave) { // não inserir o usuario logado na lista
                        firstLabel.push(data);
                    }
                });
                setListUsers(firstLabel);
            })
        })();

        setValue('');
        setPosition(0);
    }, [balance])

    async function handleTransfer() {
        let destinatary = listUsers[position];
        let valor = value;
        pix(destinatary, valor, balance);
    }


    return (
        <View style={styles.container}>
            {listUsers[position] &&

                <View style={styles.container}>

                    <View style={styles.container2}>
                        <View style={styles.viewBox}>
                            <Text style={styles.text}>Saldo atual: R${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
                        </View>

                        <View style={styles.viewPicker}>
                            <Picker
                                style={{ justifyContent: 'center' }}
                                selectedValue={position}
                                onValueChange={(item, index) => { setPosition(item) }}
                            >
                                {listUsers.map((v, k) => {
                                    return <Picker.Item
                                        key={k} value={k}
                                        label={v.cpf == undefined ? `${v.nome}` : `${v.nome} - CPF: ${v.cpf}`}
                                        enabled={k !== 0}
                                    />
                                })}
                            </Picker>
                        </View>

                        <Text style={[styles.destinatary, { display: position != 0 ? 'flex' : 'none' }]}>
                            {listUsers[position].nome} {listUsers[position].sobrenome} {listUsers[position].cpf && '- CPF: ' + listUsers[position].cpf}
                        </Text>

                        <View style={[styles.viewBox, { display: position != 0 ? 'flex' : 'none' }]}>
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
                                onPress={() => { setValue(''); setPosition(0) }}
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
            }
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
        width: 100,
        marginLeft: 10,
        padding: 6,
        fontSize: 19,
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        paddingHorizontal: 10,
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