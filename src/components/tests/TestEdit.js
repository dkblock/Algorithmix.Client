import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useTitle } from "../../hooks";
import Loader from "../_common/Loader";

const TestEdit = () => {
    const params = useParams();
    const { tests, isFetching } = useSelector(state => state.test);
    const test = tests.find(test => test.id === parseInt(params.id));

    useTitle(test?.name);

    if (!test)
        return null;

    return (
        <div>Test edit</div>
    );
};

export default TestEdit;