import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTitle } from "../../../hooks";
import { fetchAllAlgorithms } from "../../../store/actions/algorithm";
import AlgorithmCard from "./algorithm-card";
import Loader from "../../_common/loader";
import "./algorithm-grid.scss";

const AlgorithmGrid = () => {
  const dispatch = useDispatch();
  const { algorithms, isFetching } = useSelector((state) => state.algorithm);

  useEffect(() => {
    dispatch(fetchAllAlgorithms());
  }, []);

  useTitle("Алгоритмы и структуры данных", "Алгоритмы и структуры данных");

  if (isFetching) return <Loader className="m-auto" size="large" />;
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
