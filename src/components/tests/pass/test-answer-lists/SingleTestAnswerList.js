import React, { useCallback } from "react";
import Radio from "../../../_common/Radio";

const SingleTestAnswerList = ({ answers, userAnswers, setUserAnswers }) => {
  const handleUserAnswerChange = useCallback(
    (newUserAnswer) => {
      setUserAnswers([newUserAnswer]);
    },
    [setUserAnswers]
  );

  return (
    <div className="test-pass-answer-list">
      <div className="test-pass-answer-list__header">Выберите правильный ответ</div>
      <div className="test-pass-answer-list__answers">
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
