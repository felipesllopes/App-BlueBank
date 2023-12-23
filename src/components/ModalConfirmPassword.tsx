import Ionicons from "@expo/vector-icons/Ionicons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-native";
import styled from "styled-components/native";
import * as yup from "yup";
import { handleDataChange } from "../functions/handleDataChange";
import theme from "../global/styles/theme";
import { IFormEditProfile, IUser } from "../interface";
import { InputPasswordControl } from "./InputControl";
import { LoadingModal } from "./LoadingModal";
import { SendButton } from "./SendButton";

interface IProps {
    show: boolean;
    setShow: (value: boolean) => void;
    data: IFormEditProfile;
    user: IUser;
    setUser: (value: IUser) => void;
    isChecked: boolean;
}

interface IPassword {
    password: string;
}

export const ModalConfirmPassword: React.FunctionComponent<IProps> = ({
    show,
    setShow,
    data,
    user,
    setUser,
    isChecked,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const schema = yup.object({
        password: yup
            .string()
            .min(6, "Mínimo de 6 dígitos.")
            .required("Digite a sua senha."),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const confirmAlterData = async (value: IPassword) => {
        await handleDataChange(
            user,
            value,
            setLoading,
            data,
            setUser,
            isChecked,
            setShow,
        ).then(() => {
            reset();
        });
    };

    return (
        <Modal
            visible={show}
            transparent={true}
            statusBarTranslucent={true}
            animationType="fade"
        >
            <Screen>
                <Container>
                    <ButtonCancel name="close" onPress={() => setShow(false)} />
                    <Title>Salvar alterações.</Title>
                    <Text>Digite a sua senha para salvar as alterações.</Text>
                    <InputPasswordControl
                        placeholder="Senha"
                        autoCapitalize="none"
                        control={control}
                        name="password"
                        errors={
                            errors.password &&
                            (errors.password?.message as string)
                        }
                    />

                    <SendButton
                        onPress={handleSubmit(confirmAlterData)}
                        title="Confirmar"
                    />
                </Container>
                <LoadingModal loading={loading} />
            </Screen>
        </Modal>
    );
};

const Screen = styled.View`
    background-color: rgba(100, 100, 100, 0.8);
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const Container = styled.View`
    background-color: ${theme.colors.lightBlue};
    border-radius: 10px;
    padding: 20px;
`;

const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
`;

const Text = styled.Text`
    font-size: 18px;
    text-align: center;
    margin-bottom: 20px;
`;

const ButtonCancel = styled(Ionicons)`
    position: absolute;
    right: 0;
    font-size: 25px;
    padding: 7px;
`;
