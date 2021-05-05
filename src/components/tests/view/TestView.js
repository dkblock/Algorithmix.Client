import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTitle } from "../../../hooks";
import { fetchPublishedTests } from "../../../store/actions/test";
import TestList from "./TestList";
import TestInfo from "./TestInfo";
import "./TestView.scss";

const TestView = () => {
  const dispatch = useDispatch();
  const { selectedTestId } = useSelector((state) => state.test);

  useTitle("Тесты", "Тесты");

  useEffect(() => {
    dispatch(fetchPublishedTests());
  }, [dispatch]);

  return (
    <div className="test-view">
      <TestList />
      <TestInfo testId={selectedTestId} />
    </div>
  );
};

export default TestView;
