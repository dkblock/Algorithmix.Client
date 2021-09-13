import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import App from "./app";
import AppHeader from "./app-header";
import store from "../../store";
import history from "../../store/utils/history";
import "./app.scss";

const AppContainer = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppHeader />
        <App />
      </ConnectedRouter>
    </Provider>
  );
};

export { history };
export default AppContainer;