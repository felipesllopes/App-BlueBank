import { createContext, useEffect, useState } from "react";
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
    async function register(name, lastName, email, password) {

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
                }
                )
        }
    }

    async function logout() {
        await firebase.auth().signOut();
        alert("Usuário deslogado");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}