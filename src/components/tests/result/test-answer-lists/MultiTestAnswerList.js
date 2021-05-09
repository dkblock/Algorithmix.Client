import React from "react";
import Checkbox from "../../../_common/Checkbox";
import colors from "../../../../constants/colors";

const MultiTestAnswerList = ({ answers, userAnswers, label }) => (
  <div className="test-result-user-answer__answer-list">
    <div className="test-result-user-answer__header">{label}:</div>
    <div className="test-result-user-answer__answers">
      {answers.map((answer) => (
        <Checkbox key={answer.id} value={userAnswers.includes(answer.id.toString())} label={answer.value} disabled />
      ))}
    </div>
  </div>
);

export default MultiTestAnswerList;
