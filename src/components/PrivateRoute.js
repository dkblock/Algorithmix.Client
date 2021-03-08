import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getAccessToken } from "../utils/local-storage-manager";
import routes from "../utils/routes";

const PrivateRoute = ({ component: Component, path, exact }) => {
    const isLogin = !!getAccessToken();

    return (
        <Route
            path={path}
            exact={exact}
            render={(props) => (
                isLogin
                    ? <Component {...props}/>
                    : <Redirect to={routes.login}/>
            )}
        />
    );
};

export default PrivateRoute;