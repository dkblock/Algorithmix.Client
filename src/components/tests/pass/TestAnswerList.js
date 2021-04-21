import React, { useState } from "react";
import { useSelector } from "react-redux";
import testAnswerListTypes from "./test-answer-lists";

const TestAnswerList = ({ userAnswers, setUserAnswers }) => {
  const {
    currentQuestion: { answers, type },
  } = useSelector((state) => state.testPass);

  const SpecificAnswerList = testAnswerListTypes[type];

  return (
    <div>
      <SpecificAnswerList answers={answers} userAnswers={userAnswers} setUserAnswers={setUserAnswers} />
    </div>
  );
};

export default TestAnswerList;
