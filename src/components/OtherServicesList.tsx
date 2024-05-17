import React from "react";
import { ScrollView } from "react-native";
import { OtherServices } from "./OtherServices";

export const OtherServicesList: React.FunctionComponent = () => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                marginBottom: 10,
                paddingBottom: 10,
                // height: 200,
            }}
        >
            <OtherServices
                title="Negociar dívidas"
                description="Negocie suas dívidas e encontre opções de pagamento flexíveis."
                screen="Negotiation"
            />

            <OtherServices
                title="Precisa de ajuda?"
                description="Entre em contato conosco e tire as suas dúvidas."
                screen="Help"
            />

            <OtherServices
                title="Contrato"
                description="Leia os termos de contrato aqui."
                screen="Contract"
            />
        </ScrollView>
    );
};
