import React from "react";
import { useSelector } from "react-redux";
import { useTitle } from "../../../hooks";
import TestList from "./TestList";
import TestInfo from "./TestInfo";
import "./TestView.scss";

const TestView = () => {
    const selectedTest = useSelector(state => state.test.selectedTest);

    useTitle("Тесты");

    return (
        <div className="test-view">
            <TestList/>
            <TestInfo test={selectedTest}/>
        </div>
    );
};

export default TestView;