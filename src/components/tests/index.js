import React, { useEffect } from "react";
import { Route } from "react-router";
import { useDispatch } from "react-redux";
import { fetchTests } from "../../store/actions/test";
import ExecutiveRoute from "../_common/Route/ExecutiveRoute";
import TestView from "./view/TestView";
import TestEdit from "./edit/TestEdit";
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
                path={`${routes.tests}/:testId/edit`}
                render={(props) => <TestEdit {...props}/>}
            />
        </>
    );
};

export default Tests;