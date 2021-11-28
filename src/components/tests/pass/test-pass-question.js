import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Paper } from "@mui/material";
import { fetchNextTestQuestion, fetchPreviousTestQuestion } from "../../../store/actions/test-pass";
import { getFileSrc } from "../../../utils/get-file-src";
import ZoomImage from "../../_common/zoom-image";
import TestPassNavigation from "./test-pass-navigation";
import TestPassAnswerList from "./test-pass-answer-list";
import TestPassProgress from "./test-pass-progress";

const TestPassQuestion = () => {
  const dispatch = useDispatch();
  const { testId } = useParams();
  const { currentQuestion, questionOrder, currentTest, userAnswers: allUserAnswers } = useSelector(
    (state) => state.testPass
  );

  const [userAnswers, setUserAnswers] = useState([]);
  const [progressQuestionOrder, setProgressQuestionOrder] = useState(0);

  useEffect(() => {
    if (currentQuestion) {
      setUserAnswers(allUserAnswers[currentQuestion.id] ?? []);
    }
  }, [currentQuestion?.id]);

  useEffect(() => {
    if (questionOrder === progressQuestionOrder) {
      setProgressQuestionOrder(questionOrder - 1);
    }
  }, [questionOrder]);

  const handleNextQuestionClick = () => {
    if (userAnswers.length === 0) return;

    setProgressQuestionOrder(progressQuestionOrder + 1);
    dispatch(
      fetchNextTestQuestion({
        testId,
        userAnswer: {
          questionId: currentQuestion.id,
          answers: userAnswers,
        },
      })
    );
  };

  const handlePreviousQuestionClick = () => {
    dispatch(
      fetchPreviousTestQuestion({
        testId,
        currentQuestionId: currentQuestion.id,
      })
    );
  };

  return (
    <Paper className="test-pass-question" square>
      <div className="w-100">
        <TestPassProgress questionOrder={progressQuestionOrder} questionsCount={currentTest.questions.length} />
        <div className="test-pass-question__main">
          <div className="test-pass-question__info">
            <div className="test-pass-question__title">Вопрос {questionOrder}</div>
            <div>{currentQuestion.value}</div>
            <TestPassAnswerList userAnswers={userAnswers} setUserAnswers={setUserAnswers} />
          </div>
          <div className="test-pass-question__image-container">
            {currentQuestion.image && (
              <ZoomImage
                className="test-pass-question__image"
                src={getFileSrc(currentQuestion.image)}
                alt="question-image"
              />
            )}
          </div>
        </div>
      </div>
      <TestPassNavigation
        onNextQuestionClick={handleNextQuestionClick}
        onPreviousQuestionClick={handlePreviousQuestionClick}
      />
    </Paper>
  );
};

export default TestPassQuestion;
