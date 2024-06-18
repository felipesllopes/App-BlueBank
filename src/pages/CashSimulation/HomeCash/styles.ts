import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

export const Container = styled.SafeAreaView`
    background-color: ${theme.colors.secondary};
    flex: 1;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin: 50px 0 20px;
`;

export const ViewButtons = styled.View`
    flex-direction: row;
    justify-content: space-around;
`;

export const Button = styled.TouchableOpacity`
    background-color: ${theme.colors.primary};
    padding: 5px 0;
    width: 40%;
    border-radius: 5px;
    margin: 20px 0;
`;

export const TextButton = styled.Text`
    color: ${theme.colors.white};
    font-size: 20px;
    text-align: center;
`;
