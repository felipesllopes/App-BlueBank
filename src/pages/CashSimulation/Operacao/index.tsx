import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { LoadingModal } from "../../../components/LoadingModal";
import { AuthContext } from "../../../contexts/auth";
import { handleDeposit } from "../../../functions/handleDeposit";
import { handleWithdraw } from "../../../functions/handleWithdraw";
import {
    Button,
    Container,
    Input,
    TextButton,
    ViewButtons,
    ViewIcons,
} from "./styles";

export const Operacao: React.FunctionComponent = () => {
    const { goBack } = useNavigation();
    const [value, setValue] = useState<string>("");
    const { user, setUser } = useContext(AuthContext);
    const route = useRoute();
    const [loading, setLoading] = useState<boolean>(false);
    const nameOperation = JSON.stringify(route?.params);

    const confirm = async () => {
        const val = parseFloat(value);
        setLoading(false);

        if (nameOperation == `"SAQUE"`) {
            await handleWithdraw(user, setUser, val, setLoading, goBack);
        }
        if (nameOperation == `"DEPÓSITO"`) {
            await handleDeposit(user, setUser, val, setLoading, goBack);
        }
    };

    const clear = () => {
        setValue("");
    };

    const cancel = () => {
        setValue("");
        goBack();
    };

    return (
        <Container>
            <TextButton>{route?.params}</TextButton>
            <ViewIcons>
                <Input
                    value={value}
                    onChangeText={setValue}
                    maxLength={4}
                    keyboardType="numeric"
                />

                <ViewButtons>
                    <Button
                        onPress={confirm}
                        activeOpacity={0.8}
                        style={{ backgroundColor: "green", elevation: 4 }}
                        disabled={!value}
                    >
                        <TextButton>CONFIRMAR</TextButton>
                    </Button>

                    <Button
                        activeOpacity={0.8}
                        onPress={clear}
                        style={{ backgroundColor: "yellow", elevation: 4 }}
                        disabled={!value}
                    >
                        <TextButton>LIMPAR</TextButton>
                    </Button>

                    <Button
                        activeOpacity={0.8}
                        onPress={cancel}
                        style={{ backgroundColor: "red", elevation: 4 }}
                    >
                        <TextButton>CANCELAR</TextButton>
                    </Button>
                </ViewButtons>
            </ViewIcons>
            <LoadingModal loading={loading} />
        </Container>
    );
};
