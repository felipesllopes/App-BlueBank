import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/auth';

export default function EditProfile() {

    const { user } = useContext(AuthContext);
    const navigation = useNavigation();

    function saveEditions() {
        Alert.alert(
            'Salvar alterações',
            'Deseja salvar as alterações feitas?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Salvar',
                    onPress: () => { alert("Alterações feitas"); navigation.goBack() }
                }
            ]
        )
    }

    return (
        <ScrollView style={styles.container}>

            {user &&
                <View style={styles.body}>
                    <Text style={styles.tittle}>Editar perfil</Text>

                    <Text style={styles.topic}>Meus dados</Text>

                    <Text style={styles.text}>Nome</Text>
                    <TextInput
                        style={styles.information}
                        placeholder={`${user.name} ${user.lastName}`}
                    />

                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.information}
                        placeholder={user.email}
                    />

                    <Text style={styles.text}>Telefone</Text>
                    <TextInput
                        style={styles.information}
                        placeholder={""}
                        keyboardType='phone-pad'
                    />

                    <Text style={styles.text}>CPF</Text>
                    <TextInput
                        style={styles.information}
                        placeholder={user.cpf}
                    />


                    <Text style={styles.topic}>Endereço</Text>

                    <Text style={styles.text}>Logradouro</Text>
                    <TextInput
                        style={styles.information}
                        placeholder={""}
                    />

                    <Text style={styles.text}>Complemento</Text>
                    <TextInput
                        style={styles.information}
                        placeholder={""}
                    />

                    <Text style={styles.text}>Bairro</Text>
                    <TextInput
                        style={styles.information}
                        placeholder={""}
                    />

                </View>
            }

            <TouchableOpacity
                style={styles.buttonEdit}
                activeOpacity={0.7}
                onPress={saveEditions}
            >
                <Text style={styles.textEdit}>Salvar alterações</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6'
    },
    body: {
        padding: 10,
    },
    tittle: {
        textAlign: 'center',
        color: '#0000CD',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    topic: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#0000CD',
    },
    text: {
        fontSize: 19,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    information: {
        fontSize: 18,
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 3,
        paddingHorizontal: 10,
        borderBottomWidth: 2,
        borderColor: '#0000CD',
        backgroundColor: '#BBDBE0',
    },
    buttonEdit: {
        alignItems: 'center',
        backgroundColor: '#87CEEB',
        marginVertical: 20,
        paddingVertical: 4,
        width: 220,
        alignSelf: 'center',
        borderRadius: 20,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#0000CD',
    },
    textEdit: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: 'bold',
        color: '#FFF',
    },
})