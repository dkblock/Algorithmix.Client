import React from "react";
import ProgressBar from "../../_common/progress-bar";

const TestPassProgress = ({ questionOrder, questionsCount }) => (
  <div className="test-pass-question__progress">
    <ProgressBar value={questionOrder} maxValue={questionsCount} square />
  </div>
);

export default TestPassProgress;
