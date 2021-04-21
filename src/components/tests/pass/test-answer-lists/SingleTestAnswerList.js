import React, { useCallback } from "react";
import Divider from "@material-ui/core/Divider";
import Radio from "../../../_common/Radio";

const SingleTestAnswerList = ({ answers, userAnswers, setUserAnswers }) => {
  const handleUserAnswerChange = useCallback(
    (newUserAnswer) => {
      setUserAnswers([newUserAnswer]);
    },
    [setUserAnswers]
  );

  return (
    <div className="test-answer-list">
      <div className="test-answer-list__header">Ответы</div>
      <Divider />
      <div className="test-answer-list__items">
        {answers.map((answer) => (
          <Radio
            key={answer.id}
            value={userAnswers.includes(answer.id)}
            label={answer.value}
            onChange={() => handleUserAnswerChange(answer.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SingleTestAnswerList;
