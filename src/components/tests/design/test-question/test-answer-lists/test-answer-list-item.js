import React, { useCallback, useEffect, useState } from "react";
import validator from "../../../../../utils/validation";
import TextField from "../../../../_common/text-field";

const { validateAnswerValue } = validator.testAnswer;

const TestAnswerListItem = ({ answer, onAnswerValueChange }) => {
  const [answerValue, setAnswerValue] = useState(answer.value);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAnswerValue(answer.value);
    setError(null);
  }, [answer]);

  const handleAnswerValueChange = useCallback(
    (newValue) => {
      setAnswerValue(newValue);
      onAnswerValueChange(answer.id, newValue);
    },
    [answer.id, onAnswerValueChange]
  );

  const handleAnswerValueFocus = useCallback(() => {
    setError(null);
  }, []);

  const handleAnswerValueFocusOut = useCallback(() => {
    const validationError = validateAnswerValue(answerValue);
    setError(validationError);
  }, [answerValue]);

  return (
    <div className="test-answer-list__item">
      <TextField
        className="w-100"
        label="Ответ"
        error={Boolean(error)}
        helperText={error}
        value={answerValue}
        onChange={handleAnswerValueChange}
        onFocus={handleAnswerValueFocus}
        onFocusOut={handleAnswerValueFocusOut}
      />
    </div>
  );
};

export default TestAnswerListItem;