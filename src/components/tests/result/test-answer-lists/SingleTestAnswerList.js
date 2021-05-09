import React from "react";
import Radio from "../../../_common/Radio";

const SingleTestAnswerList = ({ answers, userAnswers, label }) => (
  <div className="test-result-user-answer__answer-list">
    <div className="test-result-user-answer__header">{label}:</div>
    <div className="test-result-user-answer__answers">
      {answers.map((answer) => (
        <Radio key={answer.id} value={userAnswers.includes(answer.id.toString())} label={answer.value} disabled />
      ))}
    </div>
  </div>
);

export default SingleTestAnswerList;
