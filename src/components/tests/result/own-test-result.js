import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { useTitle } from "../../../hooks";
import { fetchTestResult } from "../../../store/actions/test-pass";
import Loader from "../../_common/loader";
import CompletionResult from "../../_common/completion-result";
import UserAnswer from "./user-answer";
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

  if (isFetching || isHandlingResult) return <Loader />;
  if (!testResult && !isFetching) return null;

  return (
    <div className="test-result-container">
      <Paper className="test-result">
        <div className="test-result__main">
          <div className="test-result__info">
            <div className="test-result__title">{testResult.test.name}</div>
            <div>
              <span>Всего вопросов:</span> {testResult.test.questions.length}
            </div>
            <div>
              <span>Правильных ответов:</span> {testResult.correctAnswers}
            </div>
          </div>
          <CompletionResult value={testResult.result} color="success" size="large" label="Ваш результат" />
        </div>
        <div className="test-result__divider">
          <Divider />
        </div>
        <div>
          {testResult.userAnswers.map((userAnswer, index) => (
            <div key={userAnswer.question.id}>
              <UserAnswer userAnswer={userAnswer} questionOrder={index + 1} own />
            </div>
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default OwnTestResult;
