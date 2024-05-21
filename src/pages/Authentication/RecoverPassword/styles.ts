import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

export const Text = styled.Text`
    font-size: 18px;
    margin: 20px;
    text-align: center;
`;

export const Message = styled.Text`
    font-size: 17px;
    text-align: center;
    font-style: italic;
    margin: 5px 10px 10px;
    color: ${theme.colors.text};
`;
