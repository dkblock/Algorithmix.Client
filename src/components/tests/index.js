import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTests } from "../../store/actions/tests";
import TestsList from "./TestsList";
import Loader from "../_common/Loader";
import "./Tests.scss";

const Tests = () => {
    const dispatch = useDispatch();
    const { tests, isFetching } = useSelector(state => state.tests);

    useEffect(() => {
        dispatch(fetchTests());
    }, [dispatch]);

    if (isFetching)
        return <Loader className="tests-page__loader" size="large"/>;

    return (
        <div className="tests-page">
            <TestsList tests={tests}/>
        </div>
    );
};

export default Tests;