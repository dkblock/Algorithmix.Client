import React from "react";
import bem from "../../../utils/bem";
import AlgorithmCard from "./AlgorithmCard";
import { Card } from "react-bootstrap";

const AlgorithmsDeck = ({ algorithms }) => {
    const algorithmRows = getRows(algorithms);

    return (
        algorithmRows.map((row, index) => (
            <div key={index} className="card-deck">
                {row.map((al, alIndex) => !!al
                    ? <AlgorithmCard key={al.id} algorithm={al}/>
                    : <Card key={`${index}.${alIndex}`} style={{ borderColor: "#FFF" }}/>
                )}
            </div>
        ))
    );
};

const getRows = (algorithms) => {
    const rowLength = 3;
    const algorithmRows = [];

    algorithms.forEach((al, index) => {
        if (index % rowLength === 0)
            algorithmRows.push([al, algorithms[index + 1], algorithms[index + 2]]);
    });

    return algorithmRows;
};

export default AlgorithmsDeck;