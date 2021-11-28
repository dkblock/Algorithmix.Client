import React from "react";

const FreeTestResultAnswerList = ({ userAnswers, label }) => (
  <div className="test-result-user-answer__answer-list">
    <div className="test-result-user-answer__header">
      <span>{label}:</span> {userAnswers[0]}
    </div>
  </div>
);

export default FreeTestResultAnswerList;
