import React, { useCallback, useEffect, useMemo, useState } from "react";
import validator from "../../../../../../utils/validation";
import Button, { buttonTypes, colors } from "../../../../../_common/Button";
import { iconTypes } from "../../../../../_common/Icon";
import TextField from "../../../../../_common/TextField";

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
        {!preparedAnswer && (
          <Button color={colors.success} type={buttonTypes.text} startIcon={iconTypes.plus} onClick={onAnswerCreate}>
            Новый ответ
          </Button>
        )}
      </div>
      <div className="test-answer-list__items">
        {preparedAnswer ? (
          <FreeTestAnswerListItem answer={preparedAnswer} onAnswerValueChange={onAnswerValueChange} />
        ) : (
          <div className="m-auto pt-5">Нет ответов</div>
        )}
      </div>
    </div>
  );
};

export default FreeTestAnswerList;
