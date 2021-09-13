import React from "react";
import { Route } from "react-router";
import routes from "../../utils/routes";
import ConstructorAlgorithm from "./constructor-algorithm";
import ConstructorMain from "./constructor-main";

const Constructor = () => (
  <>
    <Route path={routes.constructor.main} exact render={(props) => <ConstructorMain {...props} />} />
    <Route
      path={routes.constructor.algorithm(":algorithmId")}
      render={(props) => <ConstructorAlgorithm {...props} />}
    />
  </>
);

export default Constructor;
