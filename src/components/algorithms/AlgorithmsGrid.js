import React from "react";
import AlgorithmCard from "./AlgorithmCard";
import { useTitle } from "../../hooks";

const AlgorithmsGrid = ({ algorithms }) => {
    useTitle("Алгоритмы");

    if (!algorithms)
        return;

    return (
        <div className="algorithms-grid">
            {algorithms.map((algorithm) => (
                <AlgorithmCard key={algorithm.id} algorithm={algorithm}/>
            ))}
        </div>
    );
};

export default AlgorithmsGrid;