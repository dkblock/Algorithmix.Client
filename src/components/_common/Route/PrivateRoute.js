import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCurrentUser } from "../../../hooks";
import routes from "../../../utils/routes";

const PrivateRoute = ({ render, path, exact }) => {
    const { isAuthenticated, isFetching } = useCurrentUser();

    if (isFetching)
        return null;

    return (
        <Route
            path={path}
            exact={exact}
            render={(props) => (
                isAuthenticated
                    ? render(props)
                    : <Redirect to={routes.login}/>
            )}
        />
    );
};

export default PrivateRoute;