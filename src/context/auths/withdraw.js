import { format } from "date-fns";
import { Alert } from "react-native";
import firebase from "../../firebase/firebaseConnection";

/**
 * Function to confirm withdraw. Mandatory parameters.
 * @param {*} valueS 
 * @param {*} balance 
 * @param {*} user 
 * @returns 
 */
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
        `Deseja confirmar o saque no valor de R$${valueN.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}?`,
        [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Confirmar',
                onPress: confirm
            }
        ]
    )

    async function confirm() {
        let uid = await user.uid;
        let key;
        await firebase.database().ref('usuario').child(uid).update({
            saldo: (currentBalance - valueN)
        })
            .then(async () => {
                key = firebase.database().ref('transacoes').child(uid).push().key;

                await firebase.database().ref('transacoes').child(uid).child(key).set({
                    tipo: 'Saque',
                    valor: valueN,
                    data: format(new Date(), 'dd/MM/yyyy'),
                    saldo: (currentBalance - valueN),
                })
            })
            .then(() => {
                alert(`Saque de R$${valueN.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} realizado com sucesso!`);
            })
            .catch((error) => { console.log(error); alert("Um erro inesperado aconteceu!") })
    }
}