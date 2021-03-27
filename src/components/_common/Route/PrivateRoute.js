import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../../hooks";
import routes from "../../../utils/routes";

const PrivateRoute = ({ component: Component, path, exact }) => {
    const isAuth = useAuth();

    return (
        <Route
            path={path}
            exact={exact}
            render={(props) => (
                isAuth
                    ? <Component {...props}/>
                    : <Redirect to={routes.login}/>
            )}
        />
    );
};

export default PrivateRoute;