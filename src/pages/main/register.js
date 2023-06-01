import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Register() {

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={require('../../img/logo-bb.png')} style={{ height: 40, width: 40 }} />
                <Text style={styles.salutation}>Bem vindo(a) ao Blue Bank!</Text>
            </View>

            <Text style={styles.textInput}>Nome</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <Text style={styles.textInput}>Sobrenome</Text>
            <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={(text) => setLastName(text)}
            />

            <Text style={styles.textInput}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
            />

            <Text style={styles.textInput}>Senha</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />

            <View style={styles.viewButton}>
                <TouchableOpacity style={styles.enterButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.textButton}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ fontSize: 16 }}>Já sou cliente</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ADD8E6',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 16,
    },
    salutation: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    textInput: {
        fontSize: 18,
        marginVertical: 4,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 2,
        paddingHorizontal: 10,
        height: 50,
        borderRadius: 4,
        fontSize: 17,
        marginBottom: 10,
        backgroundColor: 'white'
    },
    viewButton: {
        alignItems: 'center',
        marginTop: 20,
    },
    enterButton: {
        backgroundColor: '#00BFFF',
        padding: 5,
        borderRadius: 10,
        width: '100%',
        marginVertical: 14,
    },
    textButton: {
        fontSize: 20,
        textAlign: 'center',
    },
})