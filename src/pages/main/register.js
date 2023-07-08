import { useNavigation } from "@react-navigation/native";
import { useContext, useRef, useState } from "react";
import { ActivityIndicator, Image, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../context/auth";
import styles from "./Style/styles";

export default function Register() {

    const navigation = useNavigation();
    const { register, loading } = useContext(AuthContext);

    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const inputRef4 = useRef();
    const inputRef5 = useRef();

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleRegister() {
        register(email, password, name, lastName, cpf)
    }

    function focusNextInput(nextInputRef) {
        nextInputRef.current.focus(); // Passa para o próximo TextInput
    };

    function handleLastInputSubmit() {
        Keyboard.dismiss(); // Fecha o teclado após o último TextInput
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            <View style={styles.header}>
                <Image source={require('../../img/logo-bb.png')} style={{ height: 40, width: 40 }} />
                <Text style={styles.salutation}>Bem vindo(a) ao Blue Bank!</Text>
            </View>

            <Text style={styles.textInput}>Nome</Text>
            <TextInput
                ref={inputRef1}
                onSubmitEditing={() => focusNextInput(inputRef2)}
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <Text style={styles.textInput}>Sobrenome</Text>
            <TextInput
                ref={inputRef2}
                onSubmitEditing={() => focusNextInput(inputRef3)}
                style={styles.input}
                value={lastName}
                onChangeText={(text) => setLastName(text)}
            />

            <Text style={styles.textInput}>CPF (apenas dígitos)</Text>
            <TextInput
                ref={inputRef3}
                onSubmitEditing={() => focusNextInput(inputRef4)}
                style={styles.input}
                value={cpf}
                onChangeText={(text) => setCpf(text)}
                keyboardType="numeric"
                maxLength={11}
            />

            <Text style={styles.textInput}>Email</Text>
            <TextInput
                ref={inputRef4}
                onSubmitEditing={() => focusNextInput(inputRef5)}
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.textInput}>Senha</Text>
            <TextInput
                ref={inputRef5}
                onSubmitEditing={handleLastInputSubmit}
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />

            <View style={styles.viewButton}>
                <TouchableOpacity style={styles.enterButton} onPress={handleRegister}>
                    {loading ?
                        <ActivityIndicator size={30} color={'#FFF'} />
                        :
                        <Text style={styles.textButton}>Cadastrar</Text>
                    }
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ fontSize: 16 }}>Já sou cliente</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}