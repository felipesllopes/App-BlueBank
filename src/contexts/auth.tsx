import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { IFormLogin, IFormRegister, IUser } from "../interface";

interface IAuthContext {
    user: IUser;
    signed: boolean;
    loading: boolean;
    isChecked: boolean;
    setIsChecked: (value: boolean) => void;
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
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const initialValue: number = 50;

    useEffect(() => {
        (async () => {
            setLoading(true);
            await AsyncStorage.getItem("@keyBoolean")
                .then(async value => {
                    if (value === "false") {
                        return;
                    }
                    if (value === "true") {
                        setIsChecked(true);
                        await AsyncStorage.getItem("@keyEmailUser").then(
                            value => {
                                setUser(current => ({
                                    ...current,
                                    email: value,
                                }));
                            },
                        );
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        })();
    }, []);

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
                        email: data.email,
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

                        const valueBooleanString = isChecked ? "true" : "false";
                        await AsyncStorage.setItem(
                            "@keyBoolean",
                            valueBooleanString,
                        );

                        if (isChecked) {
                            await AsyncStorage.setItem(
                                "@keyEmailUser",
                                data.email,
                            );
                        }
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
                        .then(async () => {
                            await AsyncStorage.clear().then(() => {
                                setUser({} as IUser);
                                setIsChecked(false);
                            });
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
                signed: !!user.uid,
                loading,
                signUp,
                signIn,
                logOut,
                isChecked,
                setIsChecked,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
