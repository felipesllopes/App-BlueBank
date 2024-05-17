import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.secondary};
`;

export const ContainerDrawer = styled.View`
    background-color: ${theme.colors.primary};
    padding: 15px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const IconDrawer = styled(Ionicons)`
    font-size: 25px;
    color: ${theme.colors.white};
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

export const Welcome = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${theme.colors.white};
    text-align: center;
    margin-top: 20px;
`;

export const BoxBalance = styled.View`
    background-color: ${theme.colors.black};
    border-radius: 14px;
    align-items: center;
    align-self: center;
    padding: 20px;
    margin: 20px;
    width: 85%;
`;

export const ShowBalance = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
`;

export const TextBalance = styled.Text`
    text-align: center;
    font-size: 19px;
    color: ${theme.colors.white};
`;

export const IconVisible = styled(FontAwesome)`
    margin-left: 14px;
    font-size: 26px;
    color: ${theme.colors.white};
`;

export const Transactions = styled.Text`
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    background-color: white;
    border-radius: 6px;
    padding: 1px 3px;
    margin-top: 20px;
`;

export const Body = styled.View`
    padding: 10px;
`;
