import React from "react";
import Algorithms from "./Algorithms";
import useTitle from "../../hooks/useTitle";
import "./Algorithms.scss";

const AlgorithmsPage = () => {
    useTitle("Алгоритмы");
    return <Algorithms/>;
};

export default AlgorithmsPage;