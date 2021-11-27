import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTestSaving } from "../../../../hooks";
import {
  createTestAnswer,
  deleteTestAnswer,
  moveTestAnswer,
  updateTestAnswer,
} from "../../../../store/actions/test-answer";
import validator from "../../../../utils/validation";
import TestAnswerListHeader from "./test-answer-list-header";
import TestAnswerListItems from "./test-answer-list-items";

const { validateAnswer } = validator.testAnswer;

const TestAnswerList = () => {
  const dispatch = useDispatch();
  const { test, question, answers, isAnswerCreating, isAnswerUpdating } = useSelector((state) => state.testDesign);
  const isTestSaving = useTestSaving();

  const { id: testId } = test;
  const { id: questionId } = question;

  const [orderedAnswers, setOrderedAnswers] = useState([]);

  useEffect(() => {
    setOrderedAnswers(answers);
  }, [questionId, answers]);

  const handleCreateAnswer = () => dispatch(createTestAnswer({ testId, questionId, count: orderedAnswers.length }));

  const handleDeleteAnswer = (answerId) => dispatch(deleteTestAnswer({ testId, questionId, answerId }));

  const handleUpdateAnswer = (updatedAnswer) => {
    const { isValid } = validateAnswer(updatedAnswer);

    if (isValid) {
      dispatch(updateTestAnswer({ testId, questionId, answer: updatedAnswer }));
    }
  };

  const handleMoveAnswer = (newAnswers, oldIndex, newIndex) => {
    if (!isAnswerUpdating && oldIndex !== newIndex) {
      const newOrderedAnswers = newAnswers.map(({ id }) => orderedAnswers.find((a) => a.id === id));
      setOrderedAnswers(newOrderedAnswers);
      dispatch(moveTestAnswer({ testId, questionId, indexes: { oldIndex, newIndex } }));
    }
  };

  return (
    <div className="test-answer-list">
      <TestAnswerListHeader
        questionType={question.type}
        answersCount={orderedAnswers.length}
        isAnswerCreating={isAnswerCreating}
        onAnswerCreate={handleCreateAnswer}
      />
      <TestAnswerListItems
        answers={orderedAnswers}
        questionType={question.type}
        isTestSaving={isTestSaving}
        onAnswerDelete={handleDeleteAnswer}
        onAnswerUpdate={handleUpdateAnswer}
        onAnswerMove={handleMoveAnswer}
      />
    </div>
  );
};

export default TestAnswerList;
