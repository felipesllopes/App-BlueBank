import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.secondary};
    align-items: center;
    justify-content: center;
    padding: 0 50px;
`;

export const Img = styled.Image`
    width: 100px;
    height: 100px;
    margin-bottom: 70px;
`;

export const Title = styled.Text`
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 20px;
    text-align: center;
`;

export const Text = styled.Text`
    font-size: 18px;
    text-align: center;
    margin-bottom: 100px;
`;

export const Button = styled.TouchableOpacity`
    border-width: 2px;
    width: 100%;
    margin-bottom: 18px;
    padding: 5px;
    border-radius: 100px;
`;

export const TextButton = styled.Text`
    text-align: center;
    font-size: 18px;
`;
