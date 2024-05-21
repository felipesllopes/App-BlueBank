import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import * as yup from "yup";
import { DrawerButton } from "../../components/DrawerButton";
import { InputControl } from "../../components/InputControl";
import { ModalConfirmPassword } from "../../components/ModalConfirmPassword";
import { PrimaryButton } from "../../components/SendButton";
import { AuthContext } from "../../contexts/auth";
import { IFormEditProfile } from "../../interface";
import {
    ButtonCancel,
    Container,
    Icon,
    IconCancel,
    Line,
    Scroll,
    Text,
    TextCancel,
    Title,
} from "./styles";
import { HeaderDrawer, HeaderDrawer_2 } from "../../components/HeaderDrawer";

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
                    Clique para editar a informação.
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

                {/* O botão só será aberto se o isDirty sofrer alteração (for true) */}
                {isDirty && (
                    <ButtonCancel activeOpacity={0.7} onPress={() => reset()}>
                        <TextCancel>Cancelar alterações</TextCancel>
                        <IconCancel name="close-circle-outline" />
                    </ButtonCancel>
                )}

                <Line />
                <Icon name="lock-closed-outline" />
                <Title>Proteja seus dados!</Title>
                <Text>
                    Nunca compartilhe seus dados com fontes suspeitas. No
                    Bluebank, nunca entramos em contato com nossos clientes
                    solicitando informações pessoais e bancárias. Desconfie,
                    pois pode ser um golpe!
                </Text>
            </Scroll>

            <PrimaryButton
                disabled={!isDirty}
                title="Salvar alterações"
                onPress={handleSubmit(updateData)}
            />
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
