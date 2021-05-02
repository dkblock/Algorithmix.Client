import React from "react";
import { useSelector } from "react-redux";
import { useTitle } from "../../hooks";
import AlgorithmCard from "./AlgorithmCard";

const AlgorithmGrid = () => {
  const { algorithms } = useSelector((state) => state.algorithm);

  useTitle("Алгоритмы и структуры данных", "Алгоритмы и структуры данных");

  if (!algorithms) return null;

  return (
    <div className="algorithms-grid">
      {algorithms.map((algorithm) => (
        <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
      ))}
    </div>
  );
};

export default AlgorithmGrid;