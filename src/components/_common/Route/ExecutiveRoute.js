import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCurrentUser, useExecutiveRole } from "../../../hooks";
import routes from "../../../utils/routes";

const ExecutiveRoute = ({ render, path, exact }) => {
    const { isFetching } = useCurrentUser();
    const isExecutive = useExecutiveRole();

    if (isFetching)
        return null;

    return (
        <Route
            path={path}
            exact={exact}
            render={(props) => (
                isExecutive
                    ? render(props)
                    : <Redirect to={routes.login}/>
            )}
        />
    );
};

export default ExecutiveRoute;