import DateTimePicker from "@react-native-community/datetimepicker";
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
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        firestore()
            .collection("users")
            .doc(user.uid)
            .onSnapshot(async val => {
                setBalance(await val.data().balance);
            });
    }, []);

    const openDate = () => {
        setShow(true);
    };

    const closeDate = (event: Object, date: Date | undefined) => {
        setShow(false);
        if (date) {
            setDate(date);
        }
    };

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
                    <IconDate name="calendar" onPress={openDate} />
                </ViewTop>
                <TextDate>{date.toLocaleDateString()}</TextDate>
            </Body>

            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    maximumDate={new Date()}
                    onChange={closeDate}
                />
            )}
        </Container>
    );
};
