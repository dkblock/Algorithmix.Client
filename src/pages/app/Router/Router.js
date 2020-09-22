import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Test from "../../test";

const PagesRouter = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Test}/>
            <Route path="/test" component={Test}/>
        </Switch>
    </Router>
);

export default PagesRouter;
