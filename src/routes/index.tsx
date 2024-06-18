import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { TabRoutes } from "./app.route";
import { AuthRoutes } from "./auth.route";
<<<<<<< HEAD
import { LoadingScreen } from "../components/LoadingScreen";
=======
>>>>>>> d8d3304b2ccbfcea8ed0d036eae45aba3e518c25

export const Routes: React.FunctionComponent = () => {
    const { signed } = useContext(AuthContext);

    return signed ? <TabRoutes /> : <AuthRoutes />;
};
