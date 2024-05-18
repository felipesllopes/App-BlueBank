import React, { useContext } from "react";
import { LoadingScreen } from "../components/LoadingScreen";
import { AuthContext } from "../contexts/auth";
import { AppRoutes, TabRoutes } from "./app.route";
import { AuthRoutes } from "./auth.route";

export const Routes: React.FunctionComponent = () => {
    const { signed, mountingScreen } = useContext(AuthContext);

    // mountingScreen é chamada enquanto o useEffect do context carrega.
    // Enquanto ela está no if, todo componente é montado.
    // Sem ela, AppRoute seria chamada imediatamente e não daria tempo de renderizar os componentes
    // user.email depende disso.
    if (mountingScreen) {
        return <LoadingScreen />;
    }

    return signed ? <TabRoutes /> : <AuthRoutes />;
};
