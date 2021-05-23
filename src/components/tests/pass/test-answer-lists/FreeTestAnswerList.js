import React, { useCallback, useState } from "react";
import validator from "../../../../utils/validation";
import TextField from "../../../_common/TextField";

const { validateAnswerValue } = validator.testAnswer;

const FreeTestAnswerList = ({ userAnswers, setUserAnswers }) => {
  const [answerValue, setAnswerValue] = useState(userAnswers[0] ?? "");
  const [error, setError] = useState(null);

  const handleUserAnswerChange = useCallback(
    (newUserAnswer) => {
      setAnswerValue(newUserAnswer);

      if (newUserAnswer) setUserAnswers([newUserAnswer]);
      else setUserAnswers([]);
    },
    [setUserAnswers]
  );

  const handleAnswerValueFocus = useCallback(() => {
    setError(null);
  }, []);

  const handleAnswerValueFocusOut = useCallback(() => {
    const validationError = validateAnswerValue(answerValue);
    setError(validationError);
  }, [answerValue]);

  return (
    <div className="test-pass-answer-list">
      <div className="test-pass-answer-list__header">Введите правильный ответ</div>
      <div className="test-pass-answer-list__answers">
        <TextField
          className="w-100"
          error={Boolean(error)}
          helperText={error}
          value={answerValue}
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

export default FreeTestAnswerList;
