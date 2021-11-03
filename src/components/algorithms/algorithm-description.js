import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useTitle } from "../../hooks";
import Paper from "@mui/material/Paper";
import Iframe from "../_common/iframe";
import AlgorithmTimeComplexity from "./algorithm-time-complexity";
import algorithmsData from "../../constants/algorithms-data";
import { getFileSrc } from "../../utils/get-file-src";

const { description } = algorithmsData;

const AlgorithmDescription = () => {
  const { id } = useParams();
  const { algorithms } = useSelector((state) => state.algorithm);
  const algorithm = algorithms.find((a) => a.id === id);

  useTitle(algorithm?.name, algorithm?.name);

  if (!algorithm) return null;

  return (
    <Paper className="algorithm-description">
      {/*<DescriptionComponent algorithm={algorithm} component={component} />*/}
      <AlgorithmTimeComplexity complexity={algorithm.timeComplexity} />
      <Iframe src={getFileSrc(description(algorithm.id))} />
    </Paper>
  );
};

export default AlgorithmDescription;
