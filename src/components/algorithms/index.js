import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllAlgorithms } from "../../store/actions/algorithm";
import routes from "../../utils/routes";
import AlgorithmGrid from "./grid/algorithm-grid";
import AlgorithmDescription from "./description/algorithm-description";
import AlgorithmDesigner from "./design/algorithm-designer";
import ExecutiveRoute from "../_common/route/executive-route";

const Algorithms = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAlgorithms());
  }, [dispatch]);

  return (
    <>
      <Route path={routes.algorithms.main} exact render={(props) => <AlgorithmGrid {...props} />} />
      <Route
        path={routes.algorithms.description(":algorithmId")}
        exact
        render={(props) => <AlgorithmDescription {...props} />}
      />
      <ExecutiveRoute
        path={routes.algorithms.design(":algorithmId")}
        render={(props) => <AlgorithmDesigner {...props} />}
      />
    </>
  );
};

export default Algorithms;
