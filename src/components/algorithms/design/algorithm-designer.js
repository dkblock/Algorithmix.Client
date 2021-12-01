import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Paper } from "@mui/material";
import { useTitle } from "../../../hooks";
import { fetchAlgorithm } from "../../../store/actions/algorithm";
import AlgorithmInfoDesigner from "./algorithm-info-designer";
import AlgorithmImageDesigner from "./algorithm-image-designer";
import AlgorithmTimeComplexityDesigner from "./algorithm-time-complexity-designer";
import AlgorithmDataDesigner from "./algorithm-data-designer";
import AlgorithmDesignerStatus from "./algorithm-designer-status";
import Loader from "../../_common/loader";
import Redirect, { routes } from "../../_common/route/redirect";
import "./algorithm-designer.scss";

const AlgorithmDesigner = () => {
  const dispatch = useDispatch();
  const { algorithmId } = useParams();
  const { algorithm, isFetching, hasError } = useSelector((state) => state.algorithmDesign);

  useTitle(algorithm?.name, algorithm?.name);

  useEffect(() => {
    dispatch(fetchAlgorithm({ algorithmId }));
  }, [dispatch, algorithmId]);

  if (hasError) return <Redirect to={routes.management.algorithms} />;

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
              <AlgorithmDesignerStatus />
            </div>
          </>
        )}
      </Paper>
    </div>
  );
};

export default AlgorithmDesigner;
