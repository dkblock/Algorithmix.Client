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
import testAnswerListTypes from "./test-answer-lists";
import Loader from "../../../_common/Loader";

const { validateAnswer } = validator.testAnswer;

const TestAnswerList = () => {
  const dispatch = useDispatch();
  const { test, question, answers, isFetching, isSaving } = useSelector((state) => state.testDesign);

  const { id: testId } = test;
  const { id: questionId } = question;

  const [orderedAnswers, setOrderedAnswers] = useState([]);
  const [correctAnswerIds, setCorrectAnswerIds] = useState([]);

  useEffect(() => {
    setOrderedAnswers(answers);
    setCorrectAnswerIds(answers.filter((answer) => answer.isCorrect).map((answer) => answer.id));
  }, [answers]);

  const handleAnswerCreate = useCallback(() => {
    dispatch(createTestAnswer({ testId, questionId: question.id, count: answers.length }));
  }, [answers.length, dispatch, question.id, testId]);

  const handleAnswerDelete = useCallback((answerId) => dispatch(deleteTestAnswer({ testId, questionId, answerId })), [
    dispatch,
    questionId,
    testId,
  ]);

  const handleAnswerUpdate = useCallback(
    (updatedAnswer) => {
      const { isValid } = validateAnswer(updatedAnswer);

      if (isValid) {
        dispatch(updateTestAnswer({ testId, questionId, answer: { ...updatedAnswer, questionId } }));
      }
    },
    [dispatch, questionId, testId]
  );

  const handleAnswerValueChange = useDebouncedCallback((answerId, newValue) => {
    const newOrderedAnswers = orderedAnswers.map((answer) => ({
      ...answer,
      value: answer.id === answerId ? newValue : answer.value,
    }));

    const answer = newOrderedAnswers.find((ans) => ans.id === answerId);
    handleAnswerUpdate(answer);
  }, 1000);

  const handleIsCorrectAnswerChange = useCallback(
    (newOrderedAnswers, newCorrectAnswerIds, answerId) => {
      setOrderedAnswers(newOrderedAnswers);
      setCorrectAnswerIds(newCorrectAnswerIds);

      const answer = newOrderedAnswers.find((ans) => ans.id === answerId);
      handleAnswerUpdate(answer);
    },
    [handleAnswerUpdate]
  );

  const handleAnswerMove = useCallback(
    (newAnswers, oldIndex, newIndex) => {
      if (!isSaving && oldIndex !== newIndex) {
        const newOrderedAnswers = newAnswers.map(({ id }) => orderedAnswers.find((a) => a.id === id));
        setOrderedAnswers(newOrderedAnswers);
        dispatch(
          moveTestAnswer({
            testId,
            questionId,
            indexes: { oldIndex, newIndex },
          })
        );
      }
    },
    [dispatch, isSaving, orderedAnswers, questionId, testId]
  );

  const SpecificTestAnswerList = testAnswerListTypes[question.type];

  // if (isFetching) {
  //   return <Loader />;
  // }

  return (
    <SpecificTestAnswerList
      answers={orderedAnswers}
      correctAnswerIds={correctAnswerIds}
      onAnswerCreate={handleAnswerCreate}
      onAnswerDelete={handleAnswerDelete}
      onAnswerValueChange={handleAnswerValueChange}
      onIsCorrectAnswerChange={handleIsCorrectAnswerChange}
      onAnswerMove={handleAnswerMove}
    />
  );
};

export default TestAnswerList;
