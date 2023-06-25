import { createContext, useState } from "react";
import { Alert } from "react-native";
import firebase from ".././firebase/firebaseConnection";
import AlertErrorCode from "./alertError/errorCode";
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
                        AlertErrorCode(error);
                    })
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                AlertErrorCode(error);
            })
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
                        AlertErrorCode(error);
                    })
            })
            .catch((error) => {
                setLoading(false);
                console.log(error)
                AlertErrorCode(error);
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