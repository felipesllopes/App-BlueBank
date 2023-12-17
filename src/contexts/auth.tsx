import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import React, { createContext, useState } from "react";
import { IFormLogin, IFormRegister, IUser } from "../interface";
import { Alert } from "react-native";

interface IAuthContext {
    user: IUser;
    signed: boolean;
    loading: boolean;
    signUp(data: IFormRegister): void;
    signIn(data: IFormLogin): void;
    logOut(): void;
}

interface IProps {
    children: React.ReactElement;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FunctionComponent<IProps> = ({ children }) => {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [loading, setLoading] = useState<boolean>(false);
    const initialValue: number = 50;

    const signUp = async (data: IFormRegister) => {
        setLoading(true);
        await auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(async value => {
                const uid = value.user.uid;
                await firestore()
                    .collection("users")
                    .doc(uid)
                    .set({
                        name: data.name,
                        cpf: data.cpf,
                        balance: initialValue,
                    })
                    .then(() => {
                        const dados = {
                            name: data.name,
                            cpf: data.cpf,
                            balance: initialValue,
                            email: value.user.email,
                            uid: value.user.uid,
                        };
                        setUser(dados);
                    })
                    .catch(error => {
                        alert("Erro ao obter dados do usuário.");
                        console.log(error);
                    });
            })
            .catch(error => {
                alert("Erro ao cadastrar usuário.");
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const signIn = async (data: IFormLogin) => {
        setLoading(true);
        await auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then(async value => {
                const uid = value.user.uid;
                await firestore()
                    .collection("users")
                    .doc(uid)
                    .get()
                    .then(async values => {
                        const dados = {
                            name: values.data().name,
                            cpf: values.data().cpf,
                            balance: values.data().balance,
                            email: value.user.email,
                            uid: value.user.uid,
                        };
                        setUser(dados);
                    })
                    .catch(error => {
                        alert("Erro ao buscar os dados do usuário.");
                        console.log(error);
                    });
            })
            .catch(error => {
                alert("Erro ao tentar logar usuário.");
                console.log(error);
            })
            .finally(async () => {
                setLoading(false);
            });
    };

    const logOut = async () => {
        Alert.alert("Deseja sair?", "Você será deslogado da sua conta.", [
            {
                text: "Cancelar",
                style: "cancel",
            },
            {
                text: "Sair",
                onPress: async () => {
                    setLoading(true);
                    await auth()
                        .signOut()
                        .then(() => {
                            setUser({} as IUser);
                        })
                        .catch(error => {
                            alert("Erro ao sair.");
                            console.log(error);
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                },
            },
        ]);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signed: !!user.email,
                loading,
                signUp,
                signIn,
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
