import React, { useEffect } from "react";
import { Route } from "react-router";
import { useDispatch } from "react-redux";
import { fetchTests } from "../../store/actions/test";
import ExecutiveRoute from "../_common/Route/ExecutiveRoute";
import TestView from "./view/TestView";
import TestDesigner from "./design/TestDesigner";
import routes from "../../utils/routes";

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
                render={(props) => <TestView {...props}/>}
            />
            <ExecutiveRoute
                path={`${routes.tests}/:testId/design`}
                render={(props) => <TestDesigner {...props}/>}
            />
        </>
    );
};

export default Tests;