import React from "react";
import testAnswerListTypes from "./test-result-answer-lists";

const TestResultAnswerList = ({ answers, userAnswers, questionType, label }) => {
  const SpecificAnswerList = testAnswerListTypes[questionType];
  return <SpecificAnswerList answers={answers} userAnswers={userAnswers} label={label} />;
};

export default TestResultAnswerList;
