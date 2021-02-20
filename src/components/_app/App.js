import React from "react";
import { useSelector } from "react-redux";
import AppContent from "./AppContent";
import Sidebar from "../_common/Sidebar/Sidebar";

const App = () => {
    const header = useSelector(state => state.app.header);

    return (
        <div className="app">
            <header className="app__header">
                <div className="section-title">{header}</div>
            </header>
            <div className="app__main">
                <Sidebar/>
                <AppContent/>
            </div>
        </div>
    );
};

export default App;