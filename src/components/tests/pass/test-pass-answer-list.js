import React from "react";
import { useSelector } from "react-redux";
import testAnswerListTypes from "./test-pass-answer-lists";

const TestPassAnswerList = ({ userAnswers, setUserAnswers }) => {
  const {
    currentQuestion: { answers, type },
  } = useSelector((state) => state.testPass);

  const SpecificAnswerList = testAnswerListTypes[type];
  return <SpecificAnswerList answers={answers} userAnswers={userAnswers} setUserAnswers={setUserAnswers} />;
};

export default TestPassAnswerList;
