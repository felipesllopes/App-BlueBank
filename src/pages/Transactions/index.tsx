import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useContext, useEffect, useState } from "react";
import { TransactionsList } from "../../components/TransactionsList";
import { AuthContext } from "../../contexts/auth";
import { getBalance } from "../../functions/getBalance";
import { handleTransactions } from "../../functions/handleTransactions";
import theme from "../../global/styles/theme";
import { ITransactions } from "../../interface";
import {
    Body,
    Container,
    FlatListTransactions,
    IconDate,
    LoadingList,
    NotFound,
    TextBalance,
    TextDate,
    TextTransactions,
    ViewTop,
} from "./styles";

export const Transacoes: React.FunctionComponent = () => {
    const [balance, setBalance] = useState<number>(0);
    const { user } = useContext(AuthContext);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState<boolean>(false);
    const [transactions, setTransactions] = useState<ITransactions[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await getBalance(user.uid, setBalance);
        })();
    }, [user.uid]);

    useEffect(() => {
        (async () => {
            await handleTransactions(setLoading, user, setTransactions, date);
        })();
    }, [user.uid, date]);

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

                {loading ? (
                    <LoadingList color={theme.colors.primary} size={"large"} />
                ) : (
                    <FlatListTransactions
                        data={transactions}
                        renderItem={({ item }) => (
                            <TransactionsList data={item} />
                        )}
                        ListEmptyComponent={
                            <NotFound>Nenhuma transação nesta data.</NotFound>
                        }
                    />
                )}
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
