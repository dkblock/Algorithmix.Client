import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Paper } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { useTitle } from "../../../hooks";
import { fetchNextTestQuestion, fetchPreviousTestQuestion, startTestPass } from "../../../store/actions/test-pass";
import { navigateToTestResult } from "../../../utils/navigator";
import { getImageSrc } from "../../../utils/get-image-src";
import Redirect, { routes } from "../../_common/Route/Redirect";
import Loader from "../../_common/Loader";
import ZoomImage from "../../_common/ZoomImage";
import TestPassNavigation from "./TestPassNavigation";
import TestAnswerList from "./TestAnswerList";
import "./TestPass.scss";

const TestPass = () => {
  const dispatch = useDispatch();
  const { testId } = useParams();
  const { currentQuestion, isFetching, userAnswers: allUserAnswers } = useSelector((state) => state.testPass);
  const { tests } = useSelector((state) => state.test);

  const [userAnswers, setUserAnswers] = useState([]);
  const [questionOrder, setQuestionOrder] = useState(1);

  const currentTest = tests.find((t) => t.id === parseInt(testId));

  useTitle("Тест");

  useEffect(() => {
    dispatch(startTestPass({ testId }));
  }, [dispatch, testId]);

  const handleNextQuestionClick = useCallback(() => {
    if (userAnswers.length === 0) return;

    dispatch(
      fetchNextTestQuestion({
        testId,
        userAnswer: {
          questionId: currentQuestion.id,
          answers: userAnswers,
        },
      })
    );

    setUserAnswers(allUserAnswers[currentQuestion.nextQuestionId] ?? []);
    setQuestionOrder((prevState) => prevState + 1);

    if (!currentQuestion.nextQuestionId) {
      navigateToTestResult(testId);
    }
  }, [allUserAnswers, currentQuestion?.id, currentQuestion?.nextQuestionId, dispatch, testId, userAnswers]);

  const handlePreviousQuestionClick = useCallback(() => {
    dispatch(
      fetchPreviousTestQuestion({
        testId,
        currentQuestionId: currentQuestion.id,
      })
    );

    setUserAnswers(allUserAnswers[currentQuestion.previousQuestionId]);
    setQuestionOrder((prevState) => prevState - 1);
  }, [allUserAnswers, currentQuestion?.id, currentQuestion?.previousQuestionId, dispatch, testId]);

  if (currentTest?.userResult) return <Redirect to={routes.tests.result(testId)} />;
  if (!currentQuestion) return null;

  return (
    <div className="test-pass">
      <Paper className="test-pass__content">
        <div className="w-100">
          <div className="test-pass__header">Вопрос {questionOrder}</div>
          <div className="test-pass__main">
            {currentQuestion.value}
            {currentQuestion.image && (
              <div>
                <ZoomImage className="test-pass__image" src={getImageSrc(currentQuestion.image)} alt="question-image" />
              </div>
            )}
          </div>
          <Divider className="test-pass__divider" />
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
