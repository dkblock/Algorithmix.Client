import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useTitle } from "../../../hooks";
import Redirect, { routes } from "../../_common/Route/Redirect";
import TestSettings from "./TestSettings";
import Loader from "../../_common/Loader";

const TestEdit = () => {
    const params = useParams();
    const { tests, isFetching } = useSelector(state => state.test);
    const test = tests.find(test => test.id === parseInt(params.id));

    useTitle(test?.name);

    if (isFetching)
        return <Loader/>;

    if (!test)
        return <Redirect to={routes.tests}/>;

    return (
        <div className="test-edit">Test edit</div>
    );
};

export default TestEdit;