import firebase from "../../firebase/firebaseConnection";
import { Alert } from "react-native";

export default async function Withdraw(valueS, balance, user) {
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

    Alert.alert(
        'Confirmar saque?',
        `Deseja confirmar o saque no valor de R$${valueN.toFixed(2)}?`,
        [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Confirmar',
                onPress: async () => {
                    await firebase.database().ref('usuario').child(user.uid).update({
                        saldo: (currentBalance - valueN)
                    })
                        .then(() => {
                            alert(`Saque de R$${valueN.toFixed(2)} realizado com sucesso!`);
                        }).catch((error) => { console.log(error) })
                }
            }
        ]
    )
}