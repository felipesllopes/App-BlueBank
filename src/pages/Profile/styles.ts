import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.lightBlue};
`;

export const Scroll = styled.ScrollView`
    padding: 0 20px;
`;

export const Input = styled.TextInput`
    border-width: 2px;
    border-radius: 10px;
    font-size: 17px;
    padding: 3px 10px;
`;

export const Line = styled.View`
    width: 100%;
    border-width: 2px;
    border-color: ${theme.colors.primary};
    margin: 20px 0;
`;

export const Icon = styled(Ionicons)`
    font-size: 35px;
    align-self: center;
    margin-bottom: 10px;
`;

export const Text = styled.Text`
    font-size: 18px;
    text-align: center;
`;

export const PrimaryButton = styled.TouchableOpacity`
    background-color: ${theme.colors.primary};
    padding: 14px;
    align-items: center;
    border-radius: 8px;
    margin: 20px 0 10px;
`;

export const SecondaryButton = styled.TouchableOpacity`
    padding: 10px;
    align-items: center;
    border-width: 2px;
    border-radius: 8px;
    margin-bottom: 10px;
    border-color: ${theme.colors.primary};
`;

export const TextButton = styled.Text`
    font-size: 17px;
`;
