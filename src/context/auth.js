import { createContext, useState } from "react";
import { Alert } from "react-native";
import firebase from ".././firebase/firebaseConnection";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    // função para logar o usuário
    async function login(email, password) {

        if (email === "" || password === "") {
            alert("Preencha os campos")
            return;
        }
        else {
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
                            alert("Usuario logado")
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
                    alert("Usuário deslogado");
                    setUser(null);
                }
            }])
    }

    // função para realizar saque
    async function withdraw(valueS, balance) {
        let currentBalance = balance.toFixed(2);
        let valueN = parseFloat(valueS);

        if (currentBalance == 0) {
            alert("Você não possui saldo suficiente para realizar saque!");
            return;
        }

        if (valueN > currentBalance) {
            alert("Saldo insuficiente para saque neste valor!")
            return;
        }

        if (valueN <= 0) {
            alert("Valor inválido para saque!");
            return;
        }

        if (valueS === '') {
            alert("Digite o valor do saque!")
            return;
        }

        await firebase.database().ref('usuario').child(user.uid).update({
            saldo: (currentBalance - valueN)
        })
            .then(() => {
                alert(`Saque de R$${valueN} realizado com sucesso!`);
            }).catch((error) => { console.log(error) })
    }

    // função para realizar depósito
    async function deposit(value, balance) {
        let currentBalance = balance.toFixed(2);
        let valueN = parseFloat(value);

        if (value === '') {
            alert("Digite o valor do depósito!");
            return;
        }

        if (valueN <= 0) {
            alert("Digite um valor válido!");
            return;
        }

        await firebase.database().ref('usuario').child(user.uid).update({
            saldo: (parseFloat(currentBalance) + valueN)
        })
            .then(() => {
                alert(`Depósito de R$${valueN} realizado com sucesso!`)
            })
            .catch((error) => { console.log(error) })

    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, login, register, logout, withdraw, deposit }}>
            {children}
        </AuthContext.Provider>
    )
}