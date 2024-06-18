import { useRoute } from "@react-navigation/native";
import React from "react";
import { ITransactions } from "../../../interface";
import {
    BoxText,
    Container,
    Header,
    Text,
    TextBold
} from "./styles";

export const TransactionsDetails: React.FunctionComponent = () => {
    const route = useRoute();
    const data = route?.params as ITransactions;
    const val = data?.value;

    return (
        <Container>
            <Header>
                <BoxText>
                    <TextBold>{data?.type}</TextBold>
                    <Text>{data?.participant}</Text>
                </BoxText>

                <BoxText>
                    <Text>Valor</Text>
                    <TextBold>
                        {data.debit && "-"}R$
                        {val.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                        })}
                    </TextBold>
                </BoxText>
            </Header>

            <BoxText>
                <Text style={{ color: "#000" }}>
                    Saldo em conta após a transação
                </Text>
                <TextBold style={{ color: "#000" }}>
                    R$
                    {data.balance.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                    })}
                </TextBold>
            </BoxText>

            <BoxText>
                <Text style={{ color: "#000" }}>Data</Text>
                <TextBold style={{ color: "#000" }}>{data.date}</TextBold>
            </BoxText>
        </Container>
    );
};
