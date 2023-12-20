import firestore from "@react-native-firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { SendButton } from "../../components/SendButton";
import { AuthContext } from "../../contexts/auth";
import {
    Container,
    Icon,
    Input,
    InputName,
    Line,
    Scroll,
    Text,
    Title,
    ViewData,
} from "./styles";

export const Profile: React.FunctionComponent = () => {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        (async () => {
            await firestore()
                .collection("users")
                .doc(user.uid)
                .get()
                .then(async data => {
                    setName(await data.data().name);
                    setCpf(await data.data().cpf);
                    setEmail(await data.data().email);
                });
        })();
    }, [user.uid]);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
            <Container>
                <Scroll>
                    <Text style={{ margin: 10 }}>
                        Clique no campo para editar a informação.
                    </Text>

                    <ViewData>
                        <InputName>Nome:</InputName>
                        <Input value={name} onChangeText={setName} />
                    </ViewData>

                    <ViewData>
                        <InputName>E-mail:</InputName>
                        <Input value={email} onChangeText={setEmail} />
                    </ViewData>

                    <ViewData>
                        <InputName>CPF:</InputName>
                        <Input value={cpf} onChangeText={setCpf} />
                    </ViewData>

                    <Line />
                    <Icon name="lock-closed-outline" />
                    <Title>Proteja seus dados!</Title>
                    <Text>
                        Nunca compartilhe seus dados com fontes suspeitas. No
                        BlueBank, nunca entramos em contato com nossos clientes
                        solicitando informações pessoais e bancárias. Desconfie,
                        pois pode ser um golpe!
                    </Text>
                </Scroll>

                <SendButton
                    title="Salvar alterações"
                    onPress={() => alert("Alterações salvas com sucesso!")}
                />
            </Container>
        </KeyboardAvoidingView>
    );
};
