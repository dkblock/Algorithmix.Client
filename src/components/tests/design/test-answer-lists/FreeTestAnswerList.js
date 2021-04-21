import React, { useCallback, useEffect, useMemo, useState } from "react";
import Divider from "@material-ui/core/Divider";
import { IconButton, iconTypes } from "../../../_common/Icon";
import validator from "../../../../utils/validation";
import TextField from "../../../_common/TextField";

const { validateAnswerValue } = validator.testAnswer;

const prepareAnswer = (answers) => (answers.length === 0 ? null : answers[0]);

const FreeTestAnswerListItem = ({ answer, onAnswerValueChange }) => {
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
        label="Правильный ответ"
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

const FreeTestAnswerList = ({ answers, onAnswerCreate, onAnswerValueChange }) => {
  const preparedAnswer = useMemo(() => prepareAnswer(answers, onAnswerValueChange), [answers, onAnswerValueChange]);

  return (
    <div className="test-answer-list">
      <div className="test-answer-list__header">
        Ответы
        {!preparedAnswer && <IconButton type={iconTypes.plus} onClick={onAnswerCreate} />}
      </div>
      <Divider />
      <div className="test-answer-list__items">
        {preparedAnswer ? (
          <FreeTestAnswerListItem answer={preparedAnswer} onAnswerValueChange={onAnswerValueChange} />
        ) : (
          <div>Добавьте ответ</div>
        )}
      </div>
    </div>
  );
};

export default FreeTestAnswerList;
