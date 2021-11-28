import React from "react";
import Checkbox from "../../../_common/checkbox";
import colors from "../../../../constants/colors";

const MultiTestResultAnswerList = ({ answers, userAnswers, label }) => (
  <div className="test-result-user-answer__answer-list">
    <div className="test-result-user-answer__header">
      <span>{label}:</span>
    </div>
    <div className="test-result-user-answer__answers">
      {answers.map((answer) => (
        <Checkbox key={answer.id} value={userAnswers.includes(answer.id.toString())} label={answer.value} disabled />
      ))}
    </div>
  </div>
);

export default MultiTestResultAnswerList;
