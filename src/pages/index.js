import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./_main/Header/Header";
import Main from "./_main/Main/Main";

const App = () => (
    <Router>
        <Header/>
        <Main/>
    </Router>
);

export default App;
