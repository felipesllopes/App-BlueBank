import React from "react";
import { HeaderDrawer_2 } from "../../components/HeaderDrawer";
import { Container, ContainerService, Icon, Text } from "./styles";
import { BiometricAuth } from "../../components/Biometric";

export const Qr_Code: React.FunctionComponent = () => {
    return (
        <Container>
            <HeaderDrawer_2 title="QR Code" />

            <ContainerService>
                <Icon name="qr-code-outline" />
                <Text>Gerar QR Code</Text>
            </ContainerService>

            <BiometricAuth />

            <ContainerService>
                <Icon name="qr-code-outline" />
                <Text>Pagar com QR Code</Text>
            </ContainerService>
        </Container>
    );
};
