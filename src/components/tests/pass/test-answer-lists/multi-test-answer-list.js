import React, { useCallback } from "react";
import Checkbox from "../../../_common/checkbox";

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
    <div className="test-pass-answer-list">
      <div className="test-pass-answer-list__header">Выберите правильный ответ (-ы)</div>
      <div className="test-pass-answer-list__answers">
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
