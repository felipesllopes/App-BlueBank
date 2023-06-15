import firebase from "../../firebase/firebaseConnection";
import { Alert } from "react-native";

export default async function Deposit(value, balance, user) {
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

    Alert.alert(
        'Confirmar depósito?',
        `Deseja confirmar o depósito de R$${valueN.toFixed(2)}?`,
        [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Confirmar',
                onPress: async () => {
                    await firebase.database().ref('usuario').child(user.uid).update({
                        saldo: (parseFloat(currentBalance) + valueN)
                    })
                        .then(() => {
                            alert(`Depósito de R$${valueN.toFixed(2)} realizado com sucesso!`)
                        })
                        .catch((error) => { console.log(error) })
                }
            }
        ]
    )
}