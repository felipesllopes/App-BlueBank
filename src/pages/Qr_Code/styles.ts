import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.lightBlue};
`;

export const ContainerService = styled.TouchableOpacity`
    background-color: ${theme.colors.gray};
    align-items: center;
    margin-top: 40px;
    border-radius: 8px;
    padding: 20px;
    width: 60%;
    align-self: center;
`;

export const Icon = styled(Ionicons)`
    font-size: 80px;
`;

export const Text = styled.Text`
    font-size: 20px;
    text-align: center;
`;
