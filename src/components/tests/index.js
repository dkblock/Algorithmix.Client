import React, { useEffect } from "react";
import { Route } from "react-router";
import { useDispatch } from "react-redux";
import { fetchTests } from "../../store/actions/test";
import TestContainer from "./TestContainer";
import TestEdit from "./TestEdit";
import ExecutiveRoute from "../_common/Route/ExecutiveRoute";
import routes from "../../utils/routes";
import "./Tests.scss";

const Tests = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTests());
    }, [dispatch]);

    return (
        <>
            <Route
                path={routes.tests}
                exact
                render={(props) => <TestContainer {...props}/>}
            />
            <ExecutiveRoute
                path={`${routes.tests}/:id/edit`}
                render={(props) => <TestEdit {...props}/>}
            />
        </>
    );
};

export default Tests;