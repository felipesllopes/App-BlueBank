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
    const [aviso, setAviso] = useState(false);
    const [msg, setMsg] = useState('');
    const opacity = 0.7;

    /**
     * Function to register user.
     * @returns 
     */
    async function handleRegister() {
        if (name === '' || lastName === '' || cpf === '' || email === '' || password === '') {
            setAviso(true);
            setMsg("Preencha todos os campos!");
            return;
        }
        if (cpf.length < 11) {
            setAviso(true);
            setMsg("Digite o CPF completo!");
            return;
        }
        setAviso(false);
        await register(email, password, name, lastName, cpf);
    }

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
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            <View style={styles.header}>
                <Text style={styles.salutation}>Bem-vindo(a) ao Blue Bank!</Text>
                <Image source={require('../../img/logo-bb.png')} style={{ height: 40, width: 40 }} />
            </View>

            <Text style={styles.slogan}>Cadastre-se conosco e aproveite o app do melhor banco!</Text>

            <TextInput
                placeholder="Nome"
                ref={inputRef1}
                onSubmitEditing={() => focusNextInput(inputRef2)}
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <TextInput
                placeholder="Sobrenome"
                ref={inputRef2}
                onSubmitEditing={() => focusNextInput(inputRef3)}
                style={styles.input}
                value={lastName}
                onChangeText={(text) => setLastName(text)}
            />

            <TextInput
                placeholder="CPF (apenas números)"
                ref={inputRef3}
                onSubmitEditing={() => focusNextInput(inputRef4)}
                style={styles.input}
                value={cpf}
                onChangeText={(text) => setCpf(text)}
                keyboardType="numeric"
                maxLength={11}
            />

            <TextInput
                placeholder="Email"
                ref={inputRef4}
                onSubmitEditing={() => focusNextInput(inputRef5)}
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Senha (mínimo 6 dígitos)"
                ref={inputRef5}
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

                <TouchableOpacity style={styles.enterButton} onPress={handleRegister} activeOpacity={opacity}>
                    {loading ?
                        <ActivityIndicator size={30} color={'#FFF'} />
                        :
                        <Text style={styles.textButton}>Cadastrar</Text>
                    }
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={opacity}>
                    <Text style={styles.chageScreen}>Já sou cliente</Text>
                </TouchableOpacity>
            </View>

        </ScrollView >
    )
}