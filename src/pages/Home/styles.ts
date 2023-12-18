import FontAwesome from "@expo/vector-icons/FontAwesome";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.lightBlue};
`;

export const Scroll = styled.ScrollView`
    flex: 1;
    width: 100%;
`;

export const BoxLogo = styled.View`
    flex-direction: row;
    justify-content: center;
    margin: 20px 0;
    align-items: center;
`;

export const Logo = styled.Image`
    height: 45px;
    width: 45px;
`;

export const BankName = styled.Text`
    font-size: 25px;
    font-weight: bold;
    margin-left: 10px;
    color: ${theme.colors.white};
`;

export const BoxFloat = styled.View`
    position: absolute;
    background-color: ${theme.colors.white};
    border-radius: 20px;
    align-items: center;
    align-self: center;
    padding: 7px 30px;
    top: 100px;
    z-index: 2;
`;

export const Welcome = styled.Text`
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 7px;
    font-style: italic;
`;

export const HorizontalBar = styled.View`
    height: 2px;
    background-color: ${theme.colors.black};
    width: 100%;
`;

export const ShowBalance = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const TextBalance = styled.Text`
    text-align: center;
    font-size: 17px;
`;

export const ButtonCaret = styled(FontAwesome)`
    margin-left: 10px;
    font-size: 30px;
`;

export const Transactions = styled.Text`
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    text-decoration: underline;
`;

export const Body = styled.View`
    padding: 10px;
    margin-top: 40%;
`;
