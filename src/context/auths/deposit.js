import { format } from "date-fns";
import { Alert } from "react-native";
import firebase from "../../firebase/firebaseConnection";

/**
 * Function to confirm deposit. Mandatory parameters.
 * @param {*} value 
 * @param {*} balance 
 * @param {*} user 
 * @returns 
 */
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
        `Deseja confirmar o depósito de R$${valueN.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}?`,
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
            saldo: (parseFloat(currentBalance) + valueN)
        })
            .then(async () => {
                key = firebase.database().ref('transacoes').child(uid).push().key;

                await firebase.database().ref('transacoes').child(uid).child(key).set({
                    tipo: 'Depósito',
                    valor: valueN,
                    data: format(new Date(), 'dd/MM/yyyy'),
                    saldo: (parseFloat(currentBalance) + valueN),
                })
            })
            .then(() => {
                alert(`Depósito de R$${valueN.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} realizado com sucesso!`)
            })
            .catch((error) => { console.log(error); alert("Um erro inesperado aconteceu!") })
    }
}