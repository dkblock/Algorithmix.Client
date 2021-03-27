import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTests } from "../../store/actions/test";
import TestList from "./TestList";
import "./Tests.scss";

const Tests = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTests());
    }, [dispatch]);

    return (
        <div className="tests-page">
            <TestList/>
        </div>
    );
};

export default Tests;