import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../hooks";
import { auth } from "../../store/actions/account";
import AppContent from "./AppContent";
import Sidebar from "../_common/Sidebar/Sidebar";

const App = () => {
    const dispatch = useDispatch();
    const isAuth = useAuth();
    const { header } = useSelector(state => state.app);

    useEffect(() => {
        dispatch(auth());
    }, [dispatch, isAuth]);

    return (
        <div className="app">
            <Sidebar/>
            <div className="app__main">
                <header className="app__page-header bg-light">
                    <div className="app__page-header-title">{header}</div>
                </header>
                <AppContent/>
            </div>
        </div>
    );
};

export default App;