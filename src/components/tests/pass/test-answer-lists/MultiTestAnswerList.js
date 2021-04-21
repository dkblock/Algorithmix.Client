import React, { useCallback } from "react";
import Divider from "@material-ui/core/Divider";
import Checkbox from "../../../_common/Checkbox";

const MultiTestAnswerList = ({ answers, userAnswers, setUserAnswers }) => {
  const isChecked = useCallback((answer) => userAnswers.includes(answer), [userAnswers]);

  const handleUserAnswerChange = useCallback(
    (newUserAnswer) => {
      let newUserAnswers;

      if (isChecked(newUserAnswer)) newUserAnswers = userAnswers.filter((ua) => ua !== newUserAnswer);
      else newUserAnswers = [...userAnswers, newUserAnswer];

      setUserAnswers(newUserAnswers);
    },
    [isChecked, setUserAnswers, userAnswers]
  );

  return (
    <div className="test-answer-list">
      <div className="test-answer-list__header">Ответы</div>
      <Divider />
      <div className="test-answer-list__items">
        {answers.map((answer) => (
          <Checkbox
            key={answer.id}
            value={isChecked(answer.id)}
            label={answer.value}
            onChange={() => handleUserAnswerChange(answer.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiTestAnswerList;
