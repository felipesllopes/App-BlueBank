import { Alert } from "react-native";

export default function AlertErrorCode(error) {

    if (error.code == "auth/invalid-email") {
        Alert.alert(
            'Email inválido!',
            "O endereço de e-mail fornecido é inválido. Verifique se o formato do endereço de e-mail está correto.",
        );
        return;
    }

    if (error.code == "auth/weak-password") {
        Alert.alert(
            "Senha inválida!",
            "A senha fornecida é muito fraca. Ela deve ter pelo menos 6 caracteres ou atender a outros requisitos de segurança definidos."
        );
        return;
    }

    if (error.code == "auth/user-disabled") {
        Alert.alert(
            'Conta desabilitada!',
            "A conta de usuário foi desabilitada pelo administrador. Entre em contato com o suporte para obter mais informações.",
        );
        return;
    }

    if (error.code == "auth/user-not-found") {
        Alert.alert(
            'Usuário não encontrado!',
            "Não foi possível encontrar o usuário. Verifique se o usuário está registrado corretamente.",
        );
        return;
    }

    if (error.code == "auth/wrong-password") {
        Alert.alert(
            "Senha incorreta!",
            "A senha fornecida está incorreta. Verifique se a senha está digitada corretamente.",
        );
        return;
    }

    if (error.code == "auth/email-already-in-use") {
        Alert.alert(
            "Email já em uso!",
            "O endereço de e-mail fornecido já está associado a outra conta de usuário. Certifique-se de fornecer um endereço de e-mail único.",
        );
        return;
    }

    Alert.alert(
        "Erro inesperado!",
        "Um erro inesperado ocorreu. Verifique suas informações e tente novamente.",
    );
    return;

}