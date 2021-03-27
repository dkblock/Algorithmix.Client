import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AlgorithmGrid from "./AlgorithmGrid";
import AlgorithmDescription from "./AlgorithmDescription";
import Loader from "../_common/Loader";
import routes from "../../utils/routes";
import "./Algorithms.scss";

const Algorithms = () => {
    const { isFetching } = useSelector(state => state.algorithm);

    if (isFetching)
        return <Loader className="algorithms-page__loader" size="large"/>;

    return (
        <div className="algorithms-page">
            <Route
                path={routes.algorithms}
                exact
                render={(props) => <AlgorithmGrid {...props}/>}
            />
            <Route
                path={`${routes.algorithms}/:id`}
                render={(props) => <AlgorithmDescription {...props}/>}
            />
        </div>
    );
};

export default Algorithms;