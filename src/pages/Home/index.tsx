import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { BiometricsRegistrationService } from "../../components/BiometricsRegistrationService";
import { HeaderDrawer } from "../../components/HeaderDrawer";
import { LoadingModal } from "../../components/LoadingModal";
import { Margin } from "../../components/Margin";
import { OtherServicesList } from "../../components/OtherServicesList";
import { ServiceCardList } from "../../components/ServiceCardList";
import { AuthContext } from "../../contexts/auth";
import { getBackgroundImage } from "../../functions/getBackgroundImage";
import { getBalance } from "../../functions/getBalance";
import { IScreenNavigation } from "../../interface";
import { getBiometric } from "../../storage";
import {
    Background,
    Body,
    BoxBalance,
    Container,
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
    const [isBiometry, setIsBiometry] = useState<boolean>(false);
    const { navigate } = useNavigation<IScreenNavigation>();

    useEffect(() => {
        (async () => {
            await getBalance(user.uid, setBalance);
        })();
    }, [user.uid]);

    useEffect(() => {
        (async () => {
            await getBiometric().then(async value => {
                setIsBiometry(await value);
            });
        })();
    }, [getBiometric, setIsBiometry]);

    const handlevisibleBalance = () => {
        setVisibleBalance(current => (current === true ? false : true));
    };

    return (
        <Container>
            <HeaderDrawer />

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
                        <Transactions onPress={() => navigate("Transacoes")}>
                            Transações
                        </Transactions>
                    </BoxBalance>

                    <Margin pixels={40} />

                    <Body>
                        <ServiceCardList />

                        <Margin pixels={40} />

                        {!isBiometry && (
                            <View>
                                <BiometricsRegistrationService />
                                <Margin pixels={30} />
                            </View>
                        )}

                        <OtherServicesList />
                    </Body>
                </Scroll>
            </Background>

            <LoadingModal loading={loading} />
        </Container>
    );
};