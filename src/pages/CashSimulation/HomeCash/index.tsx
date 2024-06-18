import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Container, TextButton, Title, ViewButtons } from "./styles";

interface INavigation {
    navigate: (screen: string, params: string) => void;
}

export const HomeCash: React.FunctionComponent = () => {
    const { navigate } = useNavigation<INavigation>();

    return (
        <Container>
            <Title>ESCOLHA A OPERAÇÃO:</Title>

            <ViewButtons>
                <Button
                    onPress={() => navigate("Operation", `SAQUE`)}
                    activeOpacity={0.7}
                    style={{ elevation: 5 }}
                >
                    <TextButton>SAQUE</TextButton>
                </Button>

                <Button
                    onPress={() => navigate("Operation", `DEPÓSITO`)}
                    activeOpacity={0.7}
                    style={{ elevation: 5 }}
                >
                    <TextButton>DEPÓSITO</TextButton>
                </Button>
            </ViewButtons>
        </Container>
    );
};
