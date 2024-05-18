import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { LoadingModal } from "../../components/LoadingModal";
import { Logo_name_white } from "../../components/Logo";
import { Margin } from "../../components/Margin";
import { OtherServicesList } from "../../components/OtherServicesList";
import { ServiceCardList } from "../../components/ServiceCardList";
import { AuthContext } from "../../contexts/auth";
import { getBackgroundImage } from "../../functions/getBackgroundImage";
import { getBalance } from "../../functions/getBalance";
import { IScreenNavigation } from "../../interface";
import {
    Background,
    Body,
    BoxBalance,
    Container,
    ContainerDrawer,
    IconDrawer,
    IconVisible,
    Scroll,
    ShowBalance,
    TextBalance,
    Transactions,
    Welcome,
} from "./styles";

export const Home: React.FunctionComponent = () => {
    const { user, loading } = useContext(AuthContext);
    const [visibleBalance, setVisibleBalance] = useState(false);
    const [balance, setBalance] = useState<number>(0);
    const { navigate } = useNavigation<IScreenNavigation>();
    const { dispatch } = useNavigation();

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
            <ContainerDrawer>
                <Logo_name_white scale={3.3} />
                <IconDrawer
                    name="menu-sharp"
                    onPress={() => dispatch(DrawerActions.toggleDrawer())}
                />
            </ContainerDrawer>

            <Background source={getBackgroundImage()}>
                <Scroll>
                    <Welcome>Olá, {user && user.name}</Welcome>

                    <Margin pixels={20} />

                    <BoxBalance style={{ elevation: 10 }}>
                        <ShowBalance>
                            <TextBalance>Saldo disponível</TextBalance>
                            <IconVisible
                                onPress={handlevisibleBalance}
                                name={visibleBalance ? "eye" : "eye-slash"}
                            />
                        </ShowBalance>

                        <TextBalance>
                            R$
                            {visibleBalance
                                ? balance.toLocaleString("pt-BR", {
                                      minimumFractionDigits: 2,
                                  })
                                : "*****"}
                        </TextBalance>
                        <Transactions onPress={() => navigate("Transactions")}>
                            Transações
                        </Transactions>
                    </BoxBalance>

                    <Margin pixels={40} />

                    <Body>
                        <ServiceCardList />

                        <Margin pixels={40} />

                        <OtherServicesList />
                    </Body>
                </Scroll>
            </Background>

            <LoadingModal loading={loading} />
        </Container>
    );
};
