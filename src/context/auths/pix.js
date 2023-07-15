import { format } from "date-fns";
import { Alert } from "react-native";
import firebase from "../../firebase/firebaseConnection";

export default async function Pix(destinatary, valor, user, balance) {
    let value = parseFloat(valor);
    let uid = await user.uid;

    if (value > balance) {
        alert("Saldo insuficiente para realização de transferência!");
        return;
    }

    if (value <= 0) {
        alert("Digite um valor válido para transferência!");
        return;
    }

    Alert.alert(
        'Confirmar PIX?',
        `Deseja confirmar o PIX no valor de R$${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} para ${destinatary.nome}?`,
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

        await firebase.database().ref('usuario').child(uid).update({ // para alterar o saldo do pagador
            saldo: (balance - value)
        })
            .then(async () => {
                let key = firebase.database().ref('transacoes').child(await uid).push().key; // gerar chave aleatoria

                await firebase.database().ref('transacoes').child(await uid).child(key).set({ // gerar extrato
                    tipo: 'PIX enviado',
                    valor: value,
                    data: format(new Date(), 'dd/MM/yyyy'),
                    saldo: (balance - value),
                })
            })
            .then(async () => {
                await firebase.database().ref('usuario').child(destinatary.chave).update({ // para alterar o saldo do recebedor
                    saldo: (destinatary.saldo + value)
                })
                    .then(async () => {
                        let key = firebase.database().ref('transacoes').child(destinatary.chave).push().key;

                        await firebase.database().ref('transacoes').child(destinatary.chave).child(key).set({ // gerar extrato
                            tipo: 'PIX recebido',
                            valor: value,
                            data: format(new Date(), 'dd/MM/yyyy'),
                            saldo: (destinatary.saldo + value),
                        })
                    })
            })
    }

}