import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTestAnswer } from "../../../store/actions/test-answer";
import testAnswerListTypes from "./test-answer-lists";

const TestAnswerList = () => {
  const dispatch = useDispatch();
  const { selectedQuestion: question } = useSelector((state) => state.testQuestion);
  const {
    editedTest: { id: testId },
  } = useSelector((state) => state.test);
  const { answers, isFetching } = useSelector((state) => state.testAnswer);

  const handleCreateAnswer = useCallback(() => {
    dispatch(createTestAnswer({ testId, questionId: question.id, count: answers.length }));
  }, [answers.length, dispatch, question.id, testId]);

  const AnswerList = testAnswerListTypes[question.type];

  return (
    <AnswerList onCreateAnswer={handleCreateAnswer}/>
  );
};

export default TestAnswerList;
