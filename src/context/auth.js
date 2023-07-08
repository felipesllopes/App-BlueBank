import { createContext, useState } from "react";
import { Alert } from "react-native";
import firebase from ".././firebase/firebaseConnection";
import AlertErrorCode from "./alertError/errorCode";
import Deposit from "./auths/deposit";
import Withdraw from "./auths/withdraw";

export const AuthContext = createContext({});

/**
 * Function with authentication libraries for information access
 * @param {*} param0 
 * @returns 
 */
export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    /**
     * Function to login user.
     * @param {*} email 
     * @param {*} password 
     * @returns 
     */
    async function login(email, password) {

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
                        setLoading(false)
                        AlertErrorCode(error);
                    })
            })
            .catch((error) => {
                setLoading(false);
                AlertErrorCode(error);
            })
    }

    /**
     * Function to register user. Mandatory parameters.
     * @param {*} email 
     * @param {*} password 
     * @param {*} name 
     * @param {*} lastName 
     * @param {*} cpf 
     * @returns 
     */
    async function register(email, password, name, lastName, cpf) {

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
                    })
                    .catch((error) => {
                        setLoading(false);
                        AlertErrorCode(error);
                    })
            })
            .catch((error) => {
                setLoading(false);
                AlertErrorCode(error);
            })
    }

    /**
     * Function to logout user. Mandatory parameters.
     */
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
                    await firebase.auth().signOut()
                        .then(() => setUser(null))
                        .catch((error) => { alert("Um erro inesperado ocorreu!") })
                }
            }])
    }

    /**
     * Function to withdraw. Mandatory parameters.
     * @param {*} valueS 
     * @param {*} balance 
     */
    async function withdraw(valueS, balance) {
        Withdraw(valueS, balance, user);
    }

    /**
     * Function to deposit. Mandatory parameters.
     * @param {*} value 
     * @param {*} balance 
     */
    async function deposit(value, balance) {
        Deposit(value, balance, user)
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, login, register, logout, withdraw, deposit, loading, }}>
            {children}
        </AuthContext.Provider>
    )
}