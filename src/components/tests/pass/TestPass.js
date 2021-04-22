import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Paper } from "@material-ui/core";
import { useTitle } from "../../../hooks";
import { fetchNextTestQuestion, fetchPreviousTestQuestion, startTestPass } from "../../../store/actions/test-pass";
import { navigateToTestResult } from "../../../utils/navigator";
import Loader from "../../_common/Loader";
import TestPassNavigation from "./TestPassNavigation";
import "./TestPass.scss";
import TestAnswerList from "./TestAnswerList";

const TestPass = () => {
  const dispatch = useDispatch();
  const { testId } = useParams();
  const { currentQuestion, testResult, isFetching } = useSelector((state) => state.testPass);

  const [userAnswers, setUserAnswers] = useState([]);

  useTitle("Тест");

  useEffect(() => {
    dispatch(startTestPass({ testId }));
  }, [dispatch, testId]);

  const handleNextQuestionClick = useCallback(() => {
    dispatch(
      fetchNextTestQuestion({
        testId,
        userAnswer: {
          questionId: currentQuestion.id,
          answers: userAnswers,
        },
      })
    );

    setUserAnswers([]);

    if (!currentQuestion.nextQuestionId) {
      navigateToTestResult(testId);
    }
  }, [currentQuestion?.id, currentQuestion?.nextQuestionId, dispatch, testId, userAnswers]);

  const handlePreviousQuestionClick = useCallback(() => {
    dispatch(
      fetchPreviousTestQuestion({
        testId,
        currentQuestionId: currentQuestion.id,
      })
    );

    setUserAnswers([]);
  }, [currentQuestion?.id, dispatch, testId]);

  if (!currentQuestion) return null;

  return (
    <div className="test-pass">
      <Paper className="test-pass__content">
        <div className="w-100">
          {currentQuestion.value}
          <TestAnswerList userAnswers={userAnswers} setUserAnswers={setUserAnswers} />
        </div>
        <TestPassNavigation
          onNextQuestionClick={handleNextQuestionClick}
          onPreviousQuestionClick={handlePreviousQuestionClick}
        />
      </Paper>
    </div>
  );
};

export default TestPass;
