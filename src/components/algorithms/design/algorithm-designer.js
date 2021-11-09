import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Paper } from "@mui/material";
import { useTitle } from "../../../hooks";
import { fetchAlgorithm } from "../../../store/actions/algorithm";
import AlgorithmInfoDesigner from "./algorithm-info-designer";
import AlgorithmImageDesigner from "./algorithm-image-designer";
import AlgorithmTimeComplexityDesigner from "./algorithm-time-complexity-designer";
import Loader from "../../_common/loader";
import "./algorithm-designer.scss";
import AlgorithmDataDesigner from "./algorithm-data-designer";

const AlgorithmDesigner = () => {
  const dispatch = useDispatch();
  const { algorithmId } = useParams();
  const { algorithm, isFetching } = useSelector((state) => state.algorithmDesign);

  useTitle(algorithm?.name, algorithm?.name);

  useEffect(() => {
    dispatch(fetchAlgorithm({ algorithmId }));
  }, [dispatch, algorithmId]);

  return (
    <div className="algorithm-designer-container">
      <Paper className="algorithm-designer">
        {isFetching || !algorithm ? (
          <Loader className="m-auto" size="large" />
        ) : (
          <>
            <div className="algorithm-designer__left">
              <AlgorithmInfoDesigner />
              <AlgorithmImageDesigner />
            </div>
            <div className="algorithm-designer__center">
              <AlgorithmTimeComplexityDesigner />
            </div>
            <div className="algorithm-designer__right">
              <AlgorithmDataDesigner />
            </div>
          </>
        )}
      </Paper>
    </div>
  );
};

export default AlgorithmDesigner;
