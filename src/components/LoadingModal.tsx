import React, { useContext } from "react";
import { ActivityIndicator, Modal } from "react-native";
import styled from "styled-components/native";
import { AuthContext } from "../contexts/auth";
import theme from "../global/styles/theme";

export const LoadingModal: React.FunctionComponent = () => {
    const { loading } = useContext(AuthContext);

    return (
        <Modal transparent={true} visible={loading} animationType="fade">
            <Container>
                <ActivityIndicator
                    size={"large"}
                    color={theme.colors.primary}
                />
            </Container>
        </Modal>
    );
};

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: rgba(150, 150, 150, 0.7);
    align-items: center;
    justify-content: center;
`;
