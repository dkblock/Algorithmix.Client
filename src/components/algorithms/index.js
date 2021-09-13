import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AlgorithmGrid from "./algorithm-grid";
import AlgorithmDescription from "./algorithm-description";
import Loader from "../_common/loader";
import routes from "../../utils/routes";
import "./algorithms.scss";

const Algorithms = () => {
  const { isFetching } = useSelector((state) => state.algorithm);

  if (isFetching) return <Loader className="algorithms-page__loader" size="large" />;

  return (
    <div className="algorithms-page">
      <Route path={routes.algorithms} exact render={(props) => <AlgorithmGrid {...props} />} />
      <Route path={`${routes.algorithms}/:id`} render={(props) => <AlgorithmDescription {...props} />} />
    </div>
  );
};

export default Algorithms;