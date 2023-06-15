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
            alert("Preencha os campos")
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
                            }
                            setUser(data);
                            setLoading(false);
                        })
                        .catch((error) => { console.log(error) })
                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                })
        }
    }

    // função para criar cadastro de usuário
    async function register(email, password, name, lastName) {

        if (name === '' || lastName === '' || email === "" || password === "") {
            alert('Preencha os campos')
            return;
        }
        else {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((value) => {
                    let uid = value.user.uid;
                    firebase.database().ref('usuario').child(uid).set({
                        nome: name,
                        sobrenome: lastName,
                        saldo: 50,
                    })
                        .then(() => {
                            let data = {
                                uid: uid,
                                name: name,
                                lastName: lastName,
                                email: value.user.email,
                                balance: snapshot.val().saldo,
                            }
                            setUser(data);
                            alert("Cliente cadastrado com sucesso!")
                        })
                        .catch((error) => { console.log(error) })
                })
                .catch((error) => {
                    console.log("Erro: ", error)
                    alert("Ops! Ocorreu algum erro!")
                    return;
                })
        }
    }

    // função para deslogar o usuário
    async function logout() {
        Alert.alert(
            'Deseja sair?',
            'Você será deslogado do aplicativo.',
            [{
                text: 'Cancelar',
                style: 'cancel',
            }, {
                text: 'Confirmar',
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
        <AuthContext.Provider value={{ signed: !!user, user, login, register, logout, withdraw, deposit, loading }}>
            {children}
        </AuthContext.Provider>
    )
}