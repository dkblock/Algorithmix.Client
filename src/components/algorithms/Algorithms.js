import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlgorithms } from "../../store/app/actions";
import AlgorithmsGrid from "./AlgorithmsGrid";
import "./Algorithms.scss";

const Algorithms = () => {
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.app.isFetching);
    const algorithms = useSelector(state => state.app.algorithms);

    useEffect(() => {
       dispatch(fetchAlgorithms());
    }, [dispatch]);

    if (isFetching)
        return "Загрузка...";

    return <AlgorithmsGrid algorithms={algorithms}/>;
};

export default Algorithms;