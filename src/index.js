import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./pages";
import store from "./store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/_main.css";

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById("root")
);
