import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { AppRoutes } from "./app.route";
import { AuthRoutes } from "./auth.route";
import { LoadingScreen } from "../components/LoadingScreen";

export const Routes: React.FunctionComponent = () => {
    const { signed, loading } = useContext(AuthContext);

    if (loading) {
        return <LoadingScreen />;
    }

    return signed ? <AppRoutes /> : <AuthRoutes />;
};
