import firestore from "@react-native-firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import {
    Body,
    Container,
    IconDate,
    TextBalance,
    TextDate,
    TextTransactions,
    ViewTop,
} from "./styles";

export const Transactions: React.FunctionComponent = () => {
    const [balance, setBalance] = useState<number>(0);
    const { user } = useContext(AuthContext);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        firestore()
            .collection("users")
            .doc(user.uid)
            .onSnapshot(async val => {
                setBalance(await val.data().balance);
            });
    }, []);

    return (
        <Container>
            <TextBalance>
                Saldo em conta: {"\n"}
                R$
                {balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </TextBalance>

            <Body>
                <ViewTop>
                    <TextTransactions>Transações</TextTransactions>
                    <IconDate name="calendar" />
                </ViewTop>
                <TextDate>{date.toLocaleDateString()}</TextDate>
            </Body>
        </Container>
    );
};
