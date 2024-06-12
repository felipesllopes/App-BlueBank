import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.lightBlue};
`;

export const Body = styled.View`
    flex: 1;
    justify-content: space-evenly;
`;

export const ContainerService = styled.TouchableOpacity`
    background-color: ${theme.colors.gray};
    align-items: center;
    border-radius: 8px;
    padding: 20px;
    width: 60%;
    align-self: center;
`;

export const Icon = styled(Ionicons)`
    font-size: 70px;
    margin-bottom: 10px;
`;

export const Text = styled.Text`
    font-size: 20px;
    text-align: center;
`;
