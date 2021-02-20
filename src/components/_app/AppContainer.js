import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import AppHeader from "../_common/AppHeader/AppHeader";
import store from "../../store/store";
import "./App.scss";

const AppContainer = () => {
    return (
        <Provider store={store}>
            <Router>
                <AppHeader/>
                <App/>
            </Router>
        </Provider>
    );
};

export default AppContainer;