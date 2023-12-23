import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.lightBlue};
`;

export const Scroll = styled.ScrollView`
    flex: 1;
    width: 100%;
    padding: 10px;
`;

export const ViewData = styled.View`
    margin-bottom: 10px;
`;

export const InputName = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;

export const Input = styled.TextInput`
    border-width: 2px;
    border-radius: 10px;
    font-size: 17px;
    padding: 3px 10px;
`;

export const ButtonCancel = styled.TouchableOpacity`
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
`;

export const TextCancel = styled.Text`
    color: white;
    font-size: 17px;
    margin-right: 5px;
`;

export const IconCancel = styled(Ionicons)`
    color: white;
    font-size: 20px;
`;

export const Line = styled.View`
    width: 100%;
    border-width: 2px;
    border-color: ${theme.colors.darkBlue};
    margin: 20px 0;
`;

export const Body = styled.View`
    flex: 1;
`;

export const Icon = styled(Ionicons)`
    font-size: 35px;
    align-self: center;
    margin-bottom: 10px;
`;

export const Title = styled.Text`
    font-size: 20px;
    text-align: center;
    font-weight: bold;
`;

export const Text = styled.Text`
    font-size: 18px;
    text-align: center;
`;
