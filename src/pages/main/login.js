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

    const inputRef1 = useRef();
    const inputRef2 = useRef();

    function focusNextInput(nextInputRef) {
        nextInputRef.current.focus(); // Passa para o próximo TextInput
    };

    function handleLastInputSubmit() {
        Keyboard.dismiss(); // Fecha o teclado após o último TextInput
        logar();
    };

    function logar() {
        login(email, password)
    }


    return (
        <ScrollView style={styles.container}>
            <Image source={require('../../img/logo-bb.png')} style={styles.logo} resizeMode="contain" />

            <Text style={styles.textInput}>Email</Text>
            <TextInput
                placeholder="Ex. joaosilva@gmail.com"
                ref={inputRef1} // referenciar a tela p o input
                onSubmitEditing={() => focusNextInput(inputRef2)} // mudar foco p proximo input
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none" // nao começar com maiuscula
            />

            <Text style={styles.textInput}>Senha</Text>
            <TextInput
                ref={inputRef2}
                onSubmitEditing={handleLastInputSubmit}
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />

            <View style={styles.viewButton}>
                <TouchableOpacity style={styles.enterButton} onPress={logar}>
                    {loading ?
                        <ActivityIndicator size={30} color={'#FFF'} />
                        :
                        <Text style={styles.textButton}>Entrar</Text>
                    }
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ fontSize: 16 }}>Quero me tornar cliente</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}