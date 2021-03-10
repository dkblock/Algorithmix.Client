import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlgorithms } from "../../store/actions/algorithms";
import AlgorithmsGrid from "./AlgorithmsGrid";

const Algorithms = () => {
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.algorithms.isFetching);
    const algorithms = useSelector(state => state.algorithms.algorithms);

    useEffect(() => {
       dispatch(fetchAlgorithms());
    }, [dispatch]);

    if (isFetching)
        return "Загрузка...";

    return <AlgorithmsGrid algorithms={algorithms}/>;
};

export default Algorithms;