import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Paper from "@material-ui/core/Paper";
import { fetchTestResult } from "../../../store/actions/test-pass";
import NotFound from "../../NotFound";
import Loader from "../../_common/Loader";

const TestResult = () => {
  const dispatch = useDispatch();
  const { testId } = useParams();
  const { testResult, isFetching, isHandlingResult } = useSelector((state) => state.testPass);

  useEffect(() => {
    if (!isHandlingResult) {
      dispatch(fetchTestResult({ testId }));
    }
  }, [dispatch, isHandlingResult, testId]);

  if (isFetching || isHandlingResult) return <Loader />;
  if (!testResult && !isFetching) return <NotFound />;

  return (
    <div className="test-pass">
      <Paper className="test-pass__content">
        <div>Всего вопросов: {testResult.test.questions.length}</div>
        <div>Правильных ответов: {testResult.correctAnswers}</div>
      </Paper>
    </div>
  );
};

export default TestResult;
