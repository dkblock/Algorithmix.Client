import React from "react";
import { useSelector } from "react-redux";
import { useTitle } from "../../hooks";
import AlgorithmCard from "./AlgorithmCard";

const AlgorithmsGrid = () => {
    const { algorithms } = useSelector(state => state.algorithms);

    useTitle("Алгоритмы");

    if (!algorithms)
        return null;

    return (
        <div className="algorithms-grid">
            {algorithms.map((algorithm) => (
                <AlgorithmCard key={algorithm.id} algorithm={algorithm}/>
            ))}
        </div>
    );
};

export default AlgorithmsGrid;