import React from "react";
import { ScrollView } from "react-native";
import { ServiceCard } from "./ServiceCard";

export const ServiceCardList: React.FunctionComponent = () => {
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 10 }}
        >
            <ServiceCard
                source={require("../assets/cards.png")}
                screen="Cards"
                nameCard="Cartões"
            />

            <ServiceCard
                source={require("../assets/deposit.png")}
                screen="Deposit"
                nameCard="Depósito"
            />

            <ServiceCard
                source={require("../assets/payment.png")}
                screen="Payment"
                nameCard="Pagamento"
            />

            <ServiceCard
                source={require("../assets/pix.png")}
                screen="Pix"
                nameCard="Pix"
            />

            <ServiceCard
                source={require("../assets/transactions.png")}
                screen="Transactions"
                nameCard="Transações"
            />

            <ServiceCard
                source={require("../assets/transfer.png")}
                screen="Transfers"
                nameCard="Transferência"
            />
        </ScrollView>
    );
};
