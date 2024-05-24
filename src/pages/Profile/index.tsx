import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import * as yup from "yup";
import { HeaderDrawer_2 } from "../../components/HeaderDrawer";
import { InputControl } from "../../components/InputControl";
import { ModalConfirmPassword } from "../../components/ModalConfirmPassword";
import { AuthContext } from "../../contexts/auth";
import theme from "../../global/styles/theme";
import { IFormEditProfile } from "../../interface";
import {
    Container,
    PrimaryButton,
    Scroll,
    SecondaryButton,
    Text,
    TextButton,
} from "./styles";

export const Profile: React.FunctionComponent = () => {
    const { user, setUser, isChecked } = useContext(AuthContext);
    const [show, setShow] = useState<boolean>(false);
    const [data, setData] = useState<IFormEditProfile>({} as IFormEditProfile);

    const schema = yup.object({
        name: yup.string().required("Informe seu nome completo."),
        email: yup
            .string()
            .email("E-mail inválido.")
            .required("Informe seu e-mail."),
        cpf: yup
            .string()
            .min(11, "Mínimo de 11 dígitos")
            .required("Digite seu CPF."),
    });

    const defaultValues = {
        name: user.name,
        email: user.email,
        cpf: user.cpf,
    };

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty }, // isDirty para saber se o formulario sofreu alteração
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    useEffect(() => {
        // quando o valor da state user mudar, proveniente da função handleDataChange(),
        // o useEffect será chamado e o reset() atualizará o valor padrão pro novo salvo no user
        reset(defaultValues);
    }, [user]);

    const updateData = async (data: IFormEditProfile) => {
        setShow(true);
        setData(data);
        Keyboard.dismiss();
    };

    return (
        <Container>
            <HeaderDrawer_2 title="Dados do usuário" />

            <Scroll>
                <Text style={{ margin: 10, marginBottom: 25 }}>
                    Clique sobre o texto para editar a informação.
                </Text>

                <InputControl
                    control={control}
                    iconName="person"
                    placeholder="Nome completo"
                    autoCapitalize="words"
                    name="name"
                    errors={errors.name && (errors.name?.message as string)}
                />

                <InputControl
                    control={control}
                    iconName="mail"
                    name="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="E-mail"
                    errors={errors.email && (errors.email?.message as string)}
                />

                <InputControl
                    control={control}
                    iconName="card"
                    name="cpf"
                    keyboardType="numeric"
                    placeholder="CPF"
                    maxLength={11}
                    errors={errors.cpf && (errors.cpf?.message as string)}
                />

                <PrimaryButton
                    disabled={!isDirty}
                    onPress={handleSubmit(updateData)}
                >
                    <TextButton
                        style={{
                            color: isDirty
                                ? theme.colors.white
                                : theme.colors.gray,
                        }}
                    >
                        Salvar alterações
                    </TextButton>
                </PrimaryButton>

                <SecondaryButton
                    disabled={!isDirty}
                    onPress={() => {
                        reset();
                        Keyboard.dismiss();
                    }}
                >
                    <TextButton
                        style={{
                            color: !isDirty
                                ? theme.colors.gray
                                : theme.colors.black,
                        }}
                    >
                        Cancelar alterações
                    </TextButton>
                </SecondaryButton>
            </Scroll>

            <ModalConfirmPassword
                setShow={setShow}
                show={show}
                data={data}
                user={user}
                setUser={setUser}
                isChecked={isChecked}
            />
        </Container>
    );
};
