import React from "react";

const FreeTestAnswerList = ({ userAnswers, label }) => (
  <div className="test-result-user-answer__answer-list">
    <div className="test-result-user-answer__header">
      {label}: {userAnswers[0]}
    </div>
  </div>
);

export default FreeTestAnswerList;
