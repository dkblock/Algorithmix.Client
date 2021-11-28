import React from "react";
import Checkbox from "../../../_common/checkbox";

const MultiTestPassAnswerList = ({ answers, userAnswers, setUserAnswers }) => {
  const isChecked = (answer) => userAnswers.includes(answer);

  const handleUserAnswerChange = (newUserAnswer) => {
    let newUserAnswers;

    if (isChecked(newUserAnswer)) newUserAnswers = userAnswers.filter((ua) => ua !== newUserAnswer);
    else newUserAnswers = [...userAnswers, newUserAnswer];

    setUserAnswers(newUserAnswers);
  };

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

export default MultiTestPassAnswerList;
