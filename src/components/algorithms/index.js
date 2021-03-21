import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlgorithms } from "../../store/actions/algorithms";
import AlgorithmsGrid from "./AlgorithmsGrid";
import AlgorithmDescription from "./AlgorithmDescription";
import routes from "../../utils/routes";
import "./Algorithms.scss";

const Algorithms = () => {
    const dispatch = useDispatch();
    const { algorithms, isFetching } = useSelector(state => state.algorithms);

    useEffect(() => {
        dispatch(fetchAlgorithms());
    }, [dispatch]);

    if (isFetching)
        return "Загрузка...";

    return (
        <div className="algorithms-page">
            <Route
                path={routes.algorithms}
                exact
                render={(props) => <AlgorithmsGrid algorithms={algorithms} {...props}/>}
            />
            <Route
                path={`${routes.algorithms}/:id`}
                render={(props) => <AlgorithmDescription {...props}/>}
            />
        </div>
    );
};

export default Algorithms;