import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { LoadingModal } from "../../../components/LoadingModal";
import { PrimaryButton } from "../../../components/SendButton";
import { AuthContext } from "../../../contexts/auth";
import { getBalance } from "../../../functions/getBalance";
import { handlePix } from "../../../functions/handlePix";
import { IScreenNavigationPixProps, IUser } from "../../../interface";
import {
    Container,
    Data,
    IconAlert,
    Line,
    Scroll,
    Text,
    TextConfirm,
    Value,
    ViewAlert,
} from "./styles";

interface RouteParams {
    destinatary: IUser;
    value: string;
}

export const ConfirmPix: React.FunctionComponent = () => {
    const route = useRoute();
    const { destinatary, value } = route.params as RouteParams;
    const { user, setUser } = useContext(AuthContext);
    const [balance, setBalance] = useState(0);
    const val = parseFloat(value);
    const { navigate } = useNavigation<IScreenNavigationPixProps>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await getBalance(user.uid, setBalance);
        })();
    }, [user.uid]);

    const handleConfirmationPix = async () => {
        await handlePix(destinatary, value, user, setUser, setLoading);
        navigate("PaymentVoucher", { value, destinatary });
    };

    return (
        <Container>
            <Scroll>
                <ViewAlert>
                    <IconAlert name="alert" size={22} color={"#FFF"} />
                    <Text>
                        Verifique os dados antes de efetuar a transação.
                    </Text>
                </ViewAlert>

                <TextConfirm>Confirme seu pagamento</TextConfirm>

                <Text>Valor a pagar</Text>
                <Value>
                    R${""}
                    {val.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                    })}
                </Value>

                <Text>Data do pagamento</Text>
                <Data style={{ marginBottom: 0 }}>
                    {new Date().toLocaleDateString()}
                </Data>

                <Line />

                <Text>Para</Text>
                <Data>{destinatary.name}</Data>

                <Text>CPF</Text>
                <Data>
                    ***.{destinatary.cpf.slice(3, 6)}.
                    {destinatary.cpf.slice(6, 9)}
                    -**
                </Data>
            </Scroll>

            <PrimaryButton onPress={handleConfirmationPix} title="Confirmar" />

            <LoadingModal loading={loading} />
        </Container>
    );
};
