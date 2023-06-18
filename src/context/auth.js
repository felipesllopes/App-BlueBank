import { createContext, useState } from "react";
import { Alert } from "react-native";
import firebase from ".././firebase/firebaseConnection";
import Deposit from "./auths/deposit";
import Withdraw from "./auths/withdraw";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // função para logar o usuário
    async function login(email, password) {

        if (email === "" || password === "") {
            Alert.alert(
                "Atenção",
                "Preencha os campos"
            )
            return;
        }
        else {
            setLoading(true);
            await firebase.auth().signInWithEmailAndPassword(email, password)
                .then(async (value) => {
                    let uid = value.user.uid;
                    await firebase.database().ref('usuario').child(uid).once('value')
                        .then((snapshot) => {
                            let data = {
                                uid: uid,
                                name: snapshot.val().nome,
                                lastName: snapshot.val().sobrenome,
                                email: value.user.email,
                                balance: snapshot.val().saldo,
                                cpf: snapshot.val().cpf,
                            }
                            setUser(data);
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.log(error)
                            setLoading(false)
                        })
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);

                    if (error.code == "auth/invalid-email") {
                        Alert.alert(
                            'Email inválido!',
                            "O email digitado não é um email válido!",
                        );
                        return;
                    }

                    if (error.code == "auth/user-disabled") {
                        Alert.alert(
                            'Conta desativada!',
                            "A conta de usuário está desativada!",
                        );
                        return;
                    }

                    if (error.code == "auth/user-not-found") {
                        Alert.alert(
                            'Conta não encontrada!',
                            "A conta de usuário não foi encontrada!",
                        );
                        return;
                    }

                    if (error.code == "auth/wrong-password") {
                        Alert.alert(
                            "Senha incorreta!",
                            "A senha está incorreta!",
                        );
                        return;
                    }

                    if (error.code == "auth/email-already-in-use") {
                        Alert.alert(
                            "Email em uso!",
                            "O email digitado já está em uso!",
                        );
                        return;
                    }

                    Alert.alert(
                        "Erro inesperado!",
                        "Verifique seus dados e tente novamente!",
                    );
                    return;

                })
        }
    }

    // função para criar cadastro de usuário
    async function register(email, password, name, lastName, cpf) {

        if (name === '' || lastName === '' || email === "" || password === "" || cpf === "") {
            Alert.alert(
                'Atenção!',
                'Preencha todos os campos!'
            )
            return;
        }
        if (cpf.length != 11) {
            Alert.alert(
                'Atenção!',
                'Digite o CPF completo!',
            )
            return;
        }

        setLoading(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((value) => {
                let uid = value.user.uid;
                firebase.database().ref('usuario').child(uid).set({
                    nome: name,
                    sobrenome: lastName,
                    cpf: cpf,
                    saldo: 50,
                })
                    .then(() => {
                        let data = {
                            uid: uid,
                            name: name,
                            lastName: lastName,
                            email: value.user.email,
                            balance: 50,
                            cpf: cpf,
                        }
                        setUser(data);
                        setLoading(false);

                        Alert.alert(
                            'Bem-vindo(a)!',
                            `Olá, ${name} ${lastName}, seja bem-vindo(a) ao Blue Bank!`,
                        )

                    })
                    .catch((error) => {
                        setLoading(false);
                        console.log(error);

                        Alert.alert(
                            'Erro inesperado!',
                            'Parece que ocorreu um erro inesperado!',
                        )
                    })
            })
            .catch((error) => {
                setLoading(false);
                console.log(error)

                if (error.code == "auth/invalid-email") {
                    Alert.alert(
                        "Email inválido!",
                        "O email digitado não corresponde a um endereço de email!"
                    );
                    return;
                }

                if (error.code == "auth/weak-password") {
                    Alert.alert(
                        "Senha inválida!",
                        "A senha deve conter pelo menos 6 dígitos!"
                    );
                    return;
                }

                if (error.code == "auth/email-already-in-use") {
                    Alert.alert(
                        "Email em uso!",
                        "Este email já está sendo usado por outro usuário!"
                    );
                    return;
                }

                Alert.alert(
                    "Erro inesperado!",
                    "Não foi possível identificar o erro!"
                );
                return;


            })
    }

    // função para deslogar o usuário
    async function logout() {
        Alert.alert(
            'Sair',
            'Deseja sair do aplicativo?',
            [{
                text: 'Cancelar',
                style: 'cancel',
            }, {
                text: 'Sair',
                onPress: async () => {
                    await firebase.auth().signOut();
                    setUser(null);
                }
            }])
    }

    // função para realizar saque
    async function withdraw(valueS, balance) {
        Withdraw(valueS, balance, user);
    }

    // função para realizar depósito
    async function deposit(value, balance) {
        Deposit(value, balance, user)
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, login, register, logout, withdraw, deposit, loading, }}>
            {children}
        </AuthContext.Provider>
    )
}