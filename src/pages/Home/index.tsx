import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { OtherServicesList } from "../../components/OtherServicesList";
import { SendButton } from "../../components/SendButton";
import { ServiceCardList } from "../../components/ServiceCardList";
import { AuthContext } from "../../contexts/auth";
import { getBalance } from "../../functions/getBalance";
import { IScreenNavigation } from "../../interface";
import {
    BankName,
    Body,
    BoxFloat,
    BoxLogo,
    ButtonCaret,
    Container,
    HorizontalBar,
    Logo,
    Scroll,
    ShowBalance,
    TextBalance,
    Transactions,
    Welcome,
} from "./styles";

export const Home: React.FunctionComponent = () => {
    const { user, logOut } = useContext(AuthContext);
    const [visibleBalance, setVisibleBalance] = useState(false);
    const [balance, setBalance] = useState<number>(0);
    const { navigate } = useNavigation<IScreenNavigation>();

    useEffect(() => {
        (async () => {
            await getBalance(user.uid, setBalance);
        })();
    }, [user.uid]);

    const handlevisibleBalance = () => {
        setVisibleBalance(current => (current === true ? false : true));
    };

    return (
        <Container>
            <Scroll>
                <BoxLogo>
                    <Logo
                        source={require("../../assets/logo-bb.png")}
                        resizeMode="contain"
                    />
                    <BankName>Blue Bank</BankName>
                </BoxLogo>

                <BoxFloat style={{ elevation: 10 }}>
                    <Welcome>Olá, {user && user.name}!</Welcome>
                    <HorizontalBar />
                    <ShowBalance>
                        <TextBalance>Saldo disponível</TextBalance>
                        <ButtonCaret
                            onPress={handlevisibleBalance}
                            name={visibleBalance ? "caret-up" : "caret-down"}
                        />
                    </ShowBalance>

                    <View style={{ display: visibleBalance ? "flex" : "none" }}>
                        <TextBalance>
                            R$
                            {balance.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                            })}
                        </TextBalance>
                        <Transactions onPress={() => navigate("Transactions")}>
                            Transações
                        </Transactions>
                    </View>
                </BoxFloat>

                <Body>
                    <ServiceCardList />
                    <OtherServicesList />
                </Body>
            </Scroll>

            <SendButton onPress={logOut} title="Sair" />
        </Container>
    );
};
