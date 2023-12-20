import firestore from "@react-native-firebase/firestore";
import { IUser } from "../interface";

export const handlePix = async (
    destinatary: IUser,
    value: string,
    user: IUser,
    balance: number,
    setLoading: (value: React.SetStateAction<boolean>) => void,
) => {
    const userUid = user.uid;
    const destinUid = destinatary.uid;
    const val = parseFloat(value);

    setLoading(true);
    const key = firestore().collection("transactions").doc().id;

    await firestore()
        .collection("transactions")
        .doc(userUid)
        .collection("transactions")
        .doc(key)
        .set({
            type: "PIX enviado",
            value: val,
            date: new Date().toLocaleString(),
            balance: balance - val,
            debit: true,
            participant: destinatary.name,
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
                            date: new Date().toLocaleString(),
                            balance: destinatary.balance + val,
                            debit: false,
                            participant: user.name,
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
                                })
                                .finally(() => {
                                    setLoading(false);
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
        })
        .finally(() => {
            setLoading(false);
        });
};
