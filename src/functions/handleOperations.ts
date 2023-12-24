import { Alert } from "react-native";
import { IUser } from "../interface";
import firestore from "@react-native-firebase/firestore";

export const handleOparations = async (
    nameOperation: string,
    user: IUser,
    setUser: (value: IUser) => void,
    value: string,
) => {
    const val = parseFloat(value);

    if (val <= 0) {
        return;
    }

    if (nameOperation == `"SAQUE"`) {
        if (val > user.balance) {
            Alert.alert(
                "Saldo insuficiente",
                "Você não possui saldo o suficiente para realizar essa operação. Consulte o seu saldo.",
            );
            return;
        }

        if (val > 1000) {
            Alert.alert(
                "Valor não permitido",
                "Valor permitido para saque ultrapassado",
            );
            return;
        }

        const key = firestore().collection("transactions").doc().id;

        await firestore()
            .collection("transactions")
            .doc(user.uid)
            .collection("transactions")
            .doc(key)
            .set({
                type: "Saque",
                value: val,
                date: new Date().toLocaleString(),
                balance: user.balance - val,
                debit: true,
                participant: user.name,
            })
            .then(async () => {
                await firestore()
                    .collection("users")
                    .doc(user.uid)
                    .update({
                        balance: user.balance - val,
                    })
                    .then(() => {
                        setUser({ ...user, balance: user.balance - val });

                        Alert.alert(
                            "Saque realizado!",
                            `Saque de R$${val.toFixed(
                                2,
                            )} realizado com sucesso.`,
                        );
                    })
                    .catch(error => {
                        alert("Erro ao realizar operação.");
                        console.log(error);
                    });
            })
            .catch(error => {
                alert("Erro ao realizar operação.");
                console.log(error);
            });
        return;
    }

    if (nameOperation == `"DEPÓSITO"`) {
        if (val > 3000) {
            Alert.alert(
                "Valor não permitido",
                "Valor permitido para depósito ultrapassado.",
            );
            return;
        }

        const key = firestore().collection("transactions").doc().id;

        await firestore()
            .collection("transactions")
            .doc(user.uid)
            .collection("transactions")
            .doc(key)
            .set({
                type: "Depósito",
                value: val,
                date: new Date().toLocaleString(),
                balance: user.balance + val,
                debit: false,
                participant: user.name,
            })
            .then(async () => {
                await firestore()
                    .collection("users")
                    .doc(user.uid)
                    .update({
                        balance: user.balance + val,
                    })
                    .then(() => {
                        setUser({ ...user, balance: user.balance + val });

                        Alert.alert(
                            "Depósito realizado!",
                            `Depósito de R$${val.toFixed(
                                2,
                            )} realizado com sucesso.`,
                        );
                    })
                    .catch(error => {
                        alert("Erro ao realizar operação.");
                        console.log(error);
                    });
            })
            .catch(error => {
                alert("Erro ao realizar operação.");
                console.log(error);
            });
    }
};
