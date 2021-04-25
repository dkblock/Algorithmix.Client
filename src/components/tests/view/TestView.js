import React from "react";
import { useSelector } from "react-redux";
import { useTitle } from "../../../hooks";
import TestList from "./TestList";
import TestInfo from "./TestInfo";
import "./TestView.scss";

const TestView = () => {
  const { selectedTestId } = useSelector((state) => state.test);

  useTitle("Тесты");

  return (
    <div className="test-view">
      <TestList />
      <TestInfo testId={selectedTestId} />
    </div>
  );
};

export default TestView;
