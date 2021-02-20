import React from "react";
import AlgorithmCard from "./AlgorithmCard";

const AlgorithmsGrid = ({ algorithms }) => {
    if (!algorithms)
        return;

    return (
        <div className="algorithms-grid">
            {algorithms.map((algorithm) => (
                <AlgorithmCard algorithm={algorithm}/>
            ))}
        </div>
    );
};

export default AlgorithmsGrid;