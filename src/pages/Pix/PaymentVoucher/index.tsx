import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";
import { SendButton } from "../../../components/SendButton";
import { IScreenNavigation, IUser } from "../../../interface";
import {
    Container,
    Data,
    IconCheck,
    Line,
    Scroll,
    Value,
    ViewAlert,
} from "./styles";

interface RouteParams {
    destinatary: IUser;
    value: string;
}

export const PaymentVoucher: React.FunctionComponent = () => {
    const { navigate } = useNavigation<IScreenNavigation>();
    const route = useRoute();
    const { destinatary, value } = route?.params as RouteParams;
    const val = parseFloat(value);

    return (
        <Container>
            <Scroll>
                <ViewAlert>
                    <IconCheck
                        name="checkmark-circle"
                        size={30}
                        color={"#070"}
                    />
                    <Text>Seu pagamento foi realizado.</Text>
                </ViewAlert>

                <Text>Valor pago</Text>
                <Value>
                    R${" "}
                    {val.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                    })}
                </Value>

                <Text>Para</Text>
                <Data>{destinatary?.name}</Data>

                <Text>CPF</Text>
                <Data>
                    ***.{destinatary.cpf.slice(3, 6)}.
                    {destinatary.cpf.slice(6, 9)}-**
                </Data>

                <Line />

                <Text>Data e hora da transação</Text>
                <Data>{new Date().toLocaleString()}</Data>
            </Scroll>

            <SendButton title="Fechar" onPress={() => navigate("Home")} />
        </Container>
    );
};
