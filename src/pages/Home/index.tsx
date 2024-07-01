import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { BiometricsRegistrationService } from "../../components/BiometricsRegistrationService";
import { CarouselSliders } from "../../components/CarouselSLiders";
import { HeaderDrawer } from "../../components/HeaderDrawer";
import { Margin } from "../../components/Margin";
import { OtherServicesList } from "../../components/OtherServicesList";
import { ServiceCardList } from "../../components/ServiceCardList";
import { AuthContext } from "../../contexts/auth";
import { getBalance } from "../../functions/getBalance";
import { getHaveBiometrics } from "../../functions/getHaveBiometrics";
import { getSuportedBiometry } from "../../functions/getSuportedBiometry";
import { handleSliders } from "../../functions/handleSliders";
import { IScreenNavigation, ISliders } from "../../interface";
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
    const { user } = useContext(AuthContext);
    const [visibleBalance, setVisibleBalance] = useState(false);
    const [balance, setBalance] = useState<number>(0);
    const [isBiometry, setIsBiometry] = useState<boolean>(false);
    const { navigate } = useNavigation<IScreenNavigation>();
    const [sliders, setSliders] = useState<ISliders[]>([]);
    const [suportedBiometry, setSuportedBiometry] = useState<boolean>();

    useEffect(() => {
        (async () => {
            await getBalance(user.uid, setBalance);
        })();
    }, [user.uid]);

    useEffect(() => {
        (async () => {
            await getHaveBiometrics(setIsBiometry);
        })();
    }, [getBiometric, setIsBiometry]);

    useEffect(() => {
        (async () => {
            await getSuportedBiometry(setSuportedBiometry);
        })();
    }, [setSuportedBiometry]);

    useEffect(() => {
        (async () => {
            await handleSliders(setSliders);
        })();
    }, [setSliders]);

    const handlevisibleBalance = () => {
        setVisibleBalance(current => !current);
    };

    return (
        <Container>
            <HeaderDrawer />

            <Background
                source={require("../../assets/Background/background.jpg")}
            >
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

                        {/* Não exibir se a biometria já estiver cadastrada ou se não for suportada. */}
                        {!suportedBiometry ||
                            (!isBiometry && (
                                <View>
                                    <BiometricsRegistrationService />
                                    <Margin pixels={30} />
                                </View>
                            ))}

                        {sliders && <CarouselSliders sliders={sliders} />}

                        <OtherServicesList />
                    </Body>
                </Scroll>
            </Background>
        </Container>
    );
};
