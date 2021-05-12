import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { useTitle } from "../../../hooks";
import { fetchTestStats } from "../../../store/actions/test-stats";
import CompletionResult from "../../_common/CompletionResult";
import TestQuestionStats from "./TestQuestionStats";
import "./TestStats.scss";

const TestStats = () => {
  const dispatch = useDispatch();
  const { testId } = useParams();
  const { test, questions } = useSelector((state) => state.testStats);

  useTitle("Тесты", test?.name);

  useEffect(() => {
    dispatch(fetchTestStats({ testId }));
  }, [dispatch, testId]);

  if (!test) return null;

  return (
    <div className="test-stats-container">
      <Paper className="test-stats">
        <div className="test-stats__main">
          <div className="test-stats__info">
            <div className="test-stats__title">{test.name}</div>
            <div>
              <span>Алгоритм:</span> {test.algorithm.name}
            </div>
            <div>
              <span>Всего вопросов:</span> {test.questions.length}
            </div>
            <div>
              <span>Пройден раз:</span> {test.passesCount}
            </div>
          </div>
          <CompletionResult value={test.averageResult} color="primary" size="large" label="Средний результат" />
        </div>
        <div className="test-stats__divider">
          <Divider />
        </div>
        <div>
          {questions.map((question, index) => (
            <div key={question.id}>
              <TestQuestionStats question={question} questionOrder={index + 1} />
            </div>
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default TestStats;
