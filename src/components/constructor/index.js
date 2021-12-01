import React from "react";
import { Route } from "react-router";
import routes from "../../utils/routes";
import ConstructorAlgorithm from "./constructor-algorithm";
import ConstructorList from "./constructor-list";
import "./constructor.scss";

const Constructor = () => (
  <>
    <Route path={routes.constructor.main} exact render={(props) => <ConstructorList {...props} />} />
    <Route
      path={routes.constructor.algorithm(":algorithmId")}
      render={(props) => <ConstructorAlgorithm {...props} />}
    />
  </>
);

export default Constructor;
