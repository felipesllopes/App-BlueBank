import React from "react";
import { HeaderDrawer_2 } from "../../components/HeaderDrawer";
import { Body, Container, ContainerService, Icon, Text } from "./styles";
import { BiometricAuth } from "../../components/Biometric";

export const Qr_Code: React.FunctionComponent = () => {
    return (
        <Container>
            <HeaderDrawer_2 title="QR Code" />

            <Body>
                <ContainerService activeOpacity={0.7}>
                    <Icon name="qr-code-outline" />
                    <Text>Gerar QR Code</Text>
                </ContainerService>

                <Text style={{ fontSize: 17 }}>OU</Text>

                <ContainerService activeOpacity={0.7}>
                    <Icon name="qr-code-outline" />
                    <Text>Pagar com QR Code</Text>
                </ContainerService>
            </Body>
        </Container>
    );
};
