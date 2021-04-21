import React, { useCallback, useState } from "react";
import Divider from "@material-ui/core/Divider";
import validator from "../../../../utils/validation";
import TextField from "../../../_common/TextField";

const { validateAnswerValue } = validator.testAnswer;

const FreeTestAnswerList = ({ setUserAnswers }) => {
  const [answerValue, setAnswerValue] = useState("");
  const [error, setError] = useState(null);

  const handleUserAnswerChange = useCallback(
    (newUserAnswer) => {
      setAnswerValue(newUserAnswer);
      setUserAnswers([newUserAnswer]);
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
    <div className="test-answer-list">
      <div className="test-answer-list__header">Ответы</div>
      <Divider />
      <div className="test-answer-list__items">
        <TextField
          className="w-100"
          label="Ответ"
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
