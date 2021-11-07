import React from "react";
import { useSelector } from "react-redux";
import { useTitle } from "../../../hooks";
import AlgorithmCard from "./algorithm-card";
import "./algorithm-grid.scss";

const AlgorithmGrid = () => {
  const { algorithms } = useSelector((state) => state.algorithm);

  useTitle("Алгоритмы и структуры данных", "Алгоритмы и структуры данных");

  if (!algorithms) return null;

  return (
    <div className="algorithm-grid-container">
      <div className="algorithm-grid">
        {algorithms.map((algorithm) => (
          <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
        ))}
      </div>
    </div>
  );
};

export default AlgorithmGrid;
