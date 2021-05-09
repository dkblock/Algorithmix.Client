import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { useTitle } from "../../../hooks";
import { fetchUserTestResult } from "../../../store/actions/user-test-result";
import CompletionResult from "../../_common/CompletionResult";
import UserAnswer from "./UserAnswer";
import "./TestResult.scss";

const UserTestResult = () => {
  const dispatch = useDispatch();
  const { testId, userId } = useParams();
  const { testResult } = useSelector((state) => state.userTestResult);

  useTitle("Тесты", "Тесты");

  useEffect(() => {
    dispatch(fetchUserTestResult({ testId, userId }));
  }, [dispatch, testId, userId]);

  if (!testResult) return null;

  return (
    <div className="test-result-container">
      <Paper className="test-result">
        <div className="test-result__main">
          <div className="test-result__info">
            <div className="test-result__title">{testResult.test.name}</div>
            <div>
              <span>Пользователь:</span> {testResult.user.firstName} {testResult.user.lastName}
            </div>
            <div>
              <span>Группа:</span> {testResult.user.group.name}
            </div>
            <div>
              <span>Всего вопросов:</span> {testResult.test.questions.length}
            </div>
            <div>
              <span>Правильных ответов:</span> {testResult.correctAnswers}
            </div>
          </div>
          <CompletionResult value={testResult.result} color="success" size="large" label="Результат" />
        </div>
        <div className="test-result__divider">
          <Divider />
        </div>
        <div>
          {testResult.userAnswers.map((userAnswer, index) => (
            <div key={userAnswer.question.id}>
              <UserAnswer userAnswer={userAnswer} questionOrder={index + 1} />
            </div>
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default UserTestResult;
