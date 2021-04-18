import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import {
  createTestAnswer,
  deleteTestAnswer,
  moveTestAnswer,
  updateTestAnswer,
} from "../../../store/actions/test-answer";
import validator from "../../../utils/validation";
import testAnswerListTypes from "./test-answer-lists";
import Loader from "../../_common/Loader";

const { validateAnswer } = validator.testAnswer;

const TestAnswerList = () => {
  const dispatch = useDispatch();
  const { selectedQuestion: question } = useSelector((state) => state.testQuestion);
  const { editedTest } = useSelector((state) => state.test);
  const { answers, isFetching, isSaving } = useSelector((state) => state.testAnswer);

  const testId = editedTest.id;
  const questionId = question.id;

  const [orderedAnswers, setOrderedAnswers] = useState([]);
  const [correctAnswerIds, setCorrectAnswerIds] = useState([]);

  useEffect(() => {
    setOrderedAnswers(answers);
    setCorrectAnswerIds(answers.filter((answer) => answer.isCorrect).map((answer) => answer.id));
  }, [answers]);

  const handleAnswerCreate = useCallback(() => {
    dispatch(createTestAnswer({ testId, questionId: question.id, count: answers.length }));
  }, [answers.length, dispatch, question.id, testId]);

  const handleAnswerDelete = useCallback(
    (answerId) => {
      dispatch(deleteTestAnswer({ testId, questionId, answerId }));
    },
    [dispatch, questionId, testId]
  );

  const handleAnswerUpdate = useDebouncedCallback(
    (updatedAnswer) => {
      const { isValid } = validateAnswer(updatedAnswer);

      if (isValid) {
        dispatch(updateTestAnswer({ testId, questionId, answer: { ...updatedAnswer, questionId } }));
      }
    },
    500
  );

  const handleAnswerValueChange = useCallback(
    (answerId, newValue) => {
      const newOrderedAnswers = orderedAnswers.map((answer) => ({
        ...answer,
        value: answer.id === answerId ? newValue : answer.value,
      }));

      const answer = newOrderedAnswers.find((ans) => ans.id === answerId);
      handleAnswerUpdate(answer);
    },
    [handleAnswerUpdate, orderedAnswers]
  );

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
