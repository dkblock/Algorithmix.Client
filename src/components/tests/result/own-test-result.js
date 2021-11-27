import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { useTitle } from "../../../hooks";
import { fetchTestResult } from "../../../store/actions/test-pass";
import Loader from "../../_common/loader";
import UserTestResultInfo from "./user-test-result-info";
import UserAnswersList from "./user-answers-list";
import "./test-result.scss";

const OwnTestResult = () => {
  const dispatch = useDispatch();
  const { testId } = useParams();
  const { testResult, isFetching, isHandlingResult } = useSelector((state) => state.testPass);

  useTitle("Тесты", "Тесты");

  useEffect(() => {
    if (!isHandlingResult) {
      dispatch(fetchTestResult({ testId }));
    }
  }, [dispatch, isHandlingResult, testId]);

  if (isFetching || isHandlingResult) return <Loader className="m-auto" size="large" />;
  if (!testResult && !isFetching) return null;

  return (
    <div className="test-result-container">
      <Paper className="test-result">
        <UserTestResultInfo testResult={testResult} own />
        <Divider className="test-result__divider" />
        <UserAnswersList testResult={testResult} own />
      </Paper>
    </div>
  );
};

export default OwnTestResult;
