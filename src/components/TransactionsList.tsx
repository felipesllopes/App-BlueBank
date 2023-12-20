import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { ITransactions } from "../interface";

interface IProps {
    data: ITransactions;
}

interface IScreenNavigationProps {
    navigate: (screen: string, params?: ITransactions) => void;
}

export const TransactionsList: React.FunctionComponent<IProps> = ({ data }) => {
    const { navigate } = useNavigation<IScreenNavigationProps>();

    return (
        <Container
            activeOpacity={0.7}
            onPress={() => navigate("TransactionsDetails", data)}
        >
            <Box>
                <BoxType>
                    <Type>{data.type}</Type>

                    <Balance>
                        Saldo: R$
                        {data.balance.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                        })}
                    </Balance>
                </BoxType>
                <Value
                    style={{
                        color: data.debit ? "#e70000" : "#009900",
                    }}
                >
                    R$
                    {data.value.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                    })}
                </Value>
            </Box>
        </Container>
    );
};

const Container = styled.TouchableOpacity`
    flex: 1;
    margin: 10px;
    background-color: #f3f3f3;
    border-radius: 10px;
    padding: 10px 14px;
    border-width: 1px;
`;

const Box = styled.View``;

const BoxType = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const Type = styled.Text`
    font-weight: bold;
    color: #555;
`;

const Value = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;

const Balance = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #333;
`;
