import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTests } from "../../store/actions/tests";
import TestsGrid from "./TestsGrid";
import "./Tests.scss";

const Tests = () => {
    const dispatch = useDispatch();
    const { tests, isFetching } = useSelector(state => state.tests);

    useEffect(() => {
        dispatch(fetchTests());
    }, [dispatch]);

    if (isFetching)
        return "Загрузка...";

    return <TestsGrid tests={tests}/>;
};

export default Tests;