import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import firebase from "../../firebase/firebaseConnection";

export default function Login() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usuario, setUsuario] = useState(null);

    async function login() {
        if (email === "" || password === "") {
            alert("Preencha os campos")
            return
        }
        else {
            const user = await firebase.auth().signInWithEmailAndPassword(email, password)
                .then(async (user) => {
                    setUsuario(user.user.uid)
                    alert(usuario)
                    navigation.navigate('Home', { nome: 'Felipe', saldo: (1035.90).toFixed(2) })
                    setEmail(""); setPassword("");
                })
                .catch((error) => {
                    console.log(error)
                    alert("Email ou senha inválido")
                })
        }
    }

    async function listar() {

    }

    return (
        <View style={styles.container}>
            <Image source={require('../../img/logo-bb.png')} style={styles.logo} />

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
                <TouchableOpacity style={styles.enterButton} onPress={login}>
                    <Text style={styles.textButton}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ fontSize: 16 }}>Quero me tornar cliente</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ADD8E6'
    },
    logo: {
        height: 160,
        width: 160,
        alignSelf: 'center',
        marginVertical: 60,
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