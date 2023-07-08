import { useNavigation } from "@react-navigation/native";
import { useContext, useRef, useState } from "react";
import { ActivityIndicator, Image, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../context/auth";
import styles from "./Style/styles";

export default function Login() {

    const navigation = useNavigation();
    const { login, loading } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [aviso, setAviso] = useState(false);
    const [msg, setMsg] = useState('');
    const opacity = 0.7;

    const inputRef1 = useRef();
    const inputRef2 = useRef();

    /**
     * Function to move focus to the next input.
     * @param {*} nextInputRef 
     */
    function focusNextInput(nextInputRef) {
        nextInputRef.current.focus(); // Passa para o próximo TextInput
    };

    /**
     * Function to close the keyboard after the last input and call the login function.
     */
    function handleLastInputSubmit() {
        Keyboard.dismiss(); // Fecha o teclado após o último TextInput
        logar();
    };

    /**
     * Function to login the user. 
     */
    function logar() {
        if (email === '' || password === '') {
            setAviso(true);
            setMsg("Preencha todos os campos!");
            return;
        }
        login(email, password)
    }


    return (
        <ScrollView style={styles.container}>
            <Image source={require('../../img/logo-bb.png')} style={styles.logo} resizeMode="contain" />

            <TextInput
                placeholder="Email"
                ref={inputRef1} // referenciar a tela p o input
                onSubmitEditing={() => focusNextInput(inputRef2)} // mudar foco p proximo input
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none" // nao começar com maiuscula
            />

            <TextInput
                placeholder="Senha"
                ref={inputRef2}
                onSubmitEditing={handleLastInputSubmit}
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />

            <View style={styles.viewButton}>

                <View style={{ marginBottom: 10, display: aviso ? 'flex' : 'none' }}>
                    <Text>{msg}</Text>
                </View>

                <TouchableOpacity style={styles.enterButton} onPress={logar} activeOpacity={opacity}>
                    {loading ?
                        <ActivityIndicator size={30} color={'#FFF'} />
                        :
                        <Text style={styles.textButton}>Entrar</Text>
                    }
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={opacity}>
                    <Text style={styles.chageScreen}>Quero me tornar cliente</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}