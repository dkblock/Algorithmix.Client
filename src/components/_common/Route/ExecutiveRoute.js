import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useExecutiveRole } from "../../../hooks";
import routes from "../../../utils/routes";

const ExecutiveRoute = ({ component: Component, path, exact }) => {
    const isExecutive = useExecutiveRole();

    return (
        <Route
            path={path}
            exact={exact}
            render={(props) => (
                isExecutive
                    ? <Component {...props}/>
                    : <Redirect to={routes.login}/>
            )}
        />
    );
};

export default ExecutiveRoute;