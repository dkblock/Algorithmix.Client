import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useTitle } from "../../../hooks";
import Paper from "@mui/material/Paper";
import algorithmsData from "../../../constants/algorithms-data";
import { getFileSrc } from "../../../utils/get-file-src";
import Iframe from "../../_common/iframe";
import AlgorithmTimeComplexity from "./algorithm-time-complexity";
import "./algorithm-description.scss";

const { description } = algorithmsData;

const AlgorithmDescription = () => {
  const { algorithmId } = useParams();
  const { algorithms } = useSelector((state) => state.algorithm);
  const algorithm = algorithms.find((algorithm) => algorithm.id === algorithmId);

  useTitle(algorithm?.name, algorithm?.name);

  if (!algorithm) return null;

  return (
    <div className="algorithm-description-container">
      <Paper className="algorithm-description">
        {/*<DescriptionComponent algorithm={algorithm} component={component} />*/}
        <AlgorithmTimeComplexity complexity={algorithm.timeComplexity} />
        <Iframe src={getFileSrc(description(algorithm.id))} />
      </Paper>
    </div>
  );
};

export default AlgorithmDescription;
