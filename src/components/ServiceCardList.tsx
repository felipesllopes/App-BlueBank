import React from "react";
import styled from "styled-components/native";
import { ServiceCard } from "./ServiceCard";

export const ServiceCardList: React.FunctionComponent = () => {
    return (
        <Container>
            <BoxServices style={{ marginBottom: 10 }}>
                <ServiceCard
                    source={require("../assets/IconsService/cartao.png")}
                    screen="Cartao"
                    nameCard="Cartões"
                />

                <ServiceCard
                    source={require("../assets/IconsService/fatura.png")}
                    screen="Fatura"
                    nameCard="Fatura"
                />

                <ServiceCard
                    source={require("../assets/IconsService/recarga.png")}
                    screen="Recarga"
                    nameCard="Recarga"
                />

                <ServiceCard
                    source={require("../assets/IconsService/pix.png")}
                    screen="Pix"
                    nameCard="Pix"
                />
            </BoxServices>

            <BoxServices>
                <ServiceCard
                    source={require("../assets/IconsService/boleto.png")}
                    screen="Boleto"
                    nameCard="Boleto"
                />

                <ServiceCard
                    source={require("../assets/IconsService/transferencia.png")}
                    screen="Transferencia"
                    nameCard="Transferência"
                />

                <ServiceCard
                    source={require("../assets/IconsService/poupanca.png")}
                    screen="Poupanca"
                    nameCard="Poupança"
                />

                <ServiceCard
                    source={require("../assets/IconsService/investimento.png")}
                    screen="Investimento"
                    nameCard="Investimentos"
                />
            </BoxServices>
        </Container>
    );
};

const Container = styled.View``;

const BoxServices = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
