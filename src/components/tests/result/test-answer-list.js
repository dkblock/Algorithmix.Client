import React from "react";
import testAnswerListTypes from "./test-answer-lists";

const TestAnswerList = ({ answers, userAnswers, questionType, label }) => {
  const SpecificAnswerList = testAnswerListTypes[questionType];
  return <SpecificAnswerList answers={answers} userAnswers={userAnswers} label={label} />;
};

export default TestAnswerList;
