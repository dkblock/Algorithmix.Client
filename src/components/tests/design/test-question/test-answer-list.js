import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import {
  createTestAnswer,
  deleteTestAnswer,
  moveTestAnswer,
  updateTestAnswer,
} from "../../../../store/actions/test-answer";
import validator from "../../../../utils/validation";
import testAnswerListTypes from "./answer-lists";

const { validateAnswer } = validator.testAnswer;

const TestAnswerList = () => {
  const dispatch = useDispatch();
  const { test, question, answers, isSaving } = useSelector((state) => state.testDesign);

  const { id: testId } = test;
  const { id: questionId } = question;

  const [orderedAnswers, setOrderedAnswers] = useState([]);
  const [correctAnswerIds, setCorrectAnswerIds] = useState([]);

  useEffect(() => {
    setOrderedAnswers(answers);
    setCorrectAnswerIds(answers.filter((answer) => answer.isCorrect).map((answer) => answer.id));
  }, [questionId, answers.length]);

  const handleCreateAnswer = useCallback(() => {
    dispatch(createTestAnswer({ testId, questionId, count: answers.length }));
  }, [answers.length, dispatch, questionId, testId]);

  const handleDeleteAnswer = useCallback((answerId) => dispatch(deleteTestAnswer({ testId, questionId, answerId })), [
    dispatch,
    questionId,
    testId,
  ]);

  const handleUpdateAnswer = useCallback(
    (answerId, params) => {
      const answer = orderedAnswers.find((ans) => ans.id === answerId);
      const updatedAnswer = { ...answer, questionId, ...params };

      const { isValid } = validateAnswer(updatedAnswer);

      if (isValid) {
        dispatch(updateTestAnswer({ testId, questionId, answer: updatedAnswer }));
      }
    },
    [dispatch, orderedAnswers]
  );

  const handleUpdateAnswerValueDebounced = useDebouncedCallback(({ answerId, value }) => {
    handleUpdateAnswer(answerId, { value });
  }, 500);

  const handleAnswerValueChange = useCallback(
    (answerId, newValue) => {
      const newOrderedAnswers = orderedAnswers.map((answer) => ({
        ...answer,
        value: answer.id === answerId ? newValue : answer.value,
      }));

      setOrderedAnswers(newOrderedAnswers);
      handleUpdateAnswerValueDebounced({ answerId, value: newValue });
    },
    [handleUpdateAnswerValueDebounced, orderedAnswers]
  );

  const handleAnswerValueFocusOut = useCallback(
    (answerId, value) => {
      handleUpdateAnswerValueDebounced.cancel();
      handleUpdateAnswer(answerId, { value });
    },
    [orderedAnswers]
  );

  const handleIsCorrectAnswerChange = useCallback(
    (newOrderedAnswers, newCorrectAnswerIds, answerId) => {
      setOrderedAnswers(newOrderedAnswers);
      setCorrectAnswerIds(newCorrectAnswerIds);

      const answer = newOrderedAnswers.find((ans) => ans.id === answerId);
      handleUpdateAnswer(answerId, { isCorrect: answer.isCorrect });
    },
    [handleUpdateAnswer]
  );

  const handleAnswerMove = useCallback(
    (newAnswers, oldIndex, newIndex) => {
      if (!isSaving && oldIndex !== newIndex) {
        const newOrderedAnswers = newAnswers.map(({ id }) => orderedAnswers.find((a) => a.id === id));
        setOrderedAnswers(newOrderedAnswers);
        dispatch(moveTestAnswer({ testId, questionId, indexes: { oldIndex, newIndex } }));
      }
    },
    [dispatch, isSaving, orderedAnswers, questionId, testId]
  );

  const SpecificTestAnswerList = testAnswerListTypes[question.type];

  return (
    <SpecificTestAnswerList
      answers={orderedAnswers}
      correctAnswerIds={correctAnswerIds}
      isSaving={isSaving}
      onAnswerCreate={handleCreateAnswer}
      onAnswerDelete={handleDeleteAnswer}
      onAnswerValueChange={handleAnswerValueChange}
      onAnswerValueFocusOut={handleAnswerValueFocusOut}
      onIsCorrectAnswerChange={handleIsCorrectAnswerChange}
      onAnswerMove={handleAnswerMove}
    />
  );
};

export default TestAnswerList;
