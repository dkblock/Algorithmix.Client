import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTestAnswer } from "../../../store/actions/test-answer";
import { IconButton, iconTypes } from "../../_common/Icon";
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
    <AnswerList answers={answers} onCreateAnswer={handleCreateAnswer}/>
    // <div className="test-answer-list">
    //   <div className="test-answer-list__header">
    //     Ответы
    //     <IconButton type={iconTypes.plus} onClick={handleAnswerCreate} />
    //   </div>
    //   <div className="test-answer-list__items">
    //     {answers.map((answer) => (
    //       <div>{answer.value}</div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default TestAnswerList;
