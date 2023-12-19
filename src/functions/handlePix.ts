import firestore from "@react-native-firebase/firestore";
import { IUser } from "../interface";

export const handlePix = async (
    destinatary: IUser,
    value: string,
    user: IUser,
    balance: number,
) => {
    const userUid = user.uid;
    const destinUid = destinatary.uid;
    const val = parseFloat(value);

    const key = firestore().collection("transactions").doc().id;

    await firestore()
        .collection("transactions")
        .doc(userUid)
        .collection("transactions")
        .doc(key)
        .set({
            type: "PIX enviado",
            value: val,
            data: new Date().toLocaleString(),
            balance: balance - val,
        })
        .then(async () => {
            await firestore()
                .collection("users")
                .doc(userUid)
                .update({
                    balance: balance - val,
                })
                .then(async () => {
                    const key = firestore().collection("transactions").doc().id;

                    await firestore()
                        .collection("transactions")
                        .doc(destinUid)
                        .collection("transactions")
                        .doc(key)
                        .set({
                            type: "PIX recebido",
                            value: val,
                            data: new Date().toLocaleString(),
                            balance: destinatary.balance + val,
                        })
                        .then(async () => {
                            await firestore()
                                .collection("users")
                                .doc(destinUid)
                                .update({
                                    balance: destinatary.balance + val,
                                })
                                .catch(error => {
                                    alert("Erro ao tentar realizar Pix.");
                                    console.log(error);
                                });
                        })
                        .catch(error => {
                            alert("Erro ao tentar realizar Pix.");
                            console.log(error);
                        });
                })
                .catch(error => {
                    alert("Erro ao tentar realizar Pix.");
                    console.log(error);
                });
        })
        .catch(error => {
            alert("Erro ao tentar realizar Pix.");
            console.log(error);
        });
};
