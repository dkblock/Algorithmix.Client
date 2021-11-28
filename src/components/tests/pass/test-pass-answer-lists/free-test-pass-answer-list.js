import React, { useEffect, useState } from "react";
import validator from "../../../../utils/validation";
import TextField from "../../../_common/text-field";

const { validateAnswerValue } = validator.testAnswer;

const FreeTestPassAnswerList = ({ userAnswers, setUserAnswers }) => {
  const [answerValue, setAnswerValue] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userAnswers[0]) setAnswerValue(userAnswers[0]);
    else setAnswerValue("");
  }, [userAnswers]);

  const handleUserAnswerChange = (newUserAnswer) => {
    setAnswerValue(newUserAnswer);

    if (newUserAnswer) setUserAnswers([newUserAnswer]);
    else setUserAnswers([]);
  };

  const handleAnswerValueFocus = () => setError(null);

  const handleAnswerValueFocusOut = () => {
    const validationError = validateAnswerValue(answerValue);
    setError(validationError);
  };

  return (
    <div className="test-pass-answer-list">
      <div className="test-pass-answer-list__header">Введите правильный ответ</div>
      <div className="test-pass-answer-list__answers">
        <TextField
          className="w-100"
          error={Boolean(error)}
          helperText={error}
          value={answerValue}
          label="Ответ"
          multiline
          rows={4}
          onChange={handleUserAnswerChange}
          onFocus={handleAnswerValueFocus}
          onFocusOut={handleAnswerValueFocusOut}
        />
      </div>
    </div>
  );
};

export default FreeTestPassAnswerList;
