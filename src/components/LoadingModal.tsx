import React from "react";
import { ActivityIndicator, Modal } from "react-native";
import styled from "styled-components/native";
import theme from "../global/styles/theme";

interface IProps {
    loading: boolean;
}

export const LoadingModal: React.FunctionComponent<IProps> = ({ loading }) => {
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
