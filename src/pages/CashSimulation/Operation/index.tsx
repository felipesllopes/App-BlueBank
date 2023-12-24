import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { AuthContext } from "../../../contexts/auth";
import { handleOparations } from "../../../functions/handleOperations";
import {
    Button,
    Container,
    Input,
    TextButton,
    ViewButtons,
    ViewIcons,
} from "./styles";
import { LoadingModal } from "../../../components/LoadingModal";

export const Operation: React.FunctionComponent = () => {
    const { setOptions, goBack } = useNavigation();
    const [value, setValue] = useState<string>("");
    const { user, setUser } = useContext(AuthContext);
    const route = useRoute();
    const [loading, setLoading] = useState<boolean>(false);
    const operation = route?.params;

    useLayoutEffect(() => {
        setOptions({
            title: operation,
        });
    }, [operation, setOptions]);

    const confirm = async () => {
        let nameOperation = JSON.stringify(operation);
        setLoading(true);
        await handleOparations(nameOperation, user, setUser, value).then(() => {
            clear();
            cancel();
            setLoading(false);
        });
    };

    const clear = () => {
        setValue("");
    };

    const cancel = () => {
        goBack();
    };

    return (
        <Container>
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
                    >
                        <TextButton>CONFIRMAR</TextButton>
                    </Button>

                    <Button
                        activeOpacity={0.8}
                        onPress={clear}
                        style={{ backgroundColor: "yellow", elevation: 4 }}
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
