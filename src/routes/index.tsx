import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { AppRoutes } from "./app.route";
import { AuthRoutes } from "./auth.route";

export const Routes: React.FunctionComponent = () => {
    const { signed } = useContext(AuthContext);

    return signed ? <AppRoutes /> : <AuthRoutes />;
};
