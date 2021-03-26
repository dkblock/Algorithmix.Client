import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTests } from "../../store/actions/tests";
import TestList from "./TestList";
import "./Tests.scss";

const Tests = () => {
    const dispatch = useDispatch();
    const { tests, isFetching } = useSelector(state => state.tests);

    useEffect(() => {
        dispatch(fetchTests());
    }, [dispatch]);

    return (
        <div className="tests-page">
            <TestList tests={tests}/>
        </div>
    );
};

export default Tests;