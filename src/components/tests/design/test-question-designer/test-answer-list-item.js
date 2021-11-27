import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedUpdate, useTestSaving } from "../../../../hooks";
import { updateCorrectTestAnswer } from "../../../../store/actions/test-answer";
import validator from "../../../../utils/validation";
import testQuestionTypes from "../../../../constants/test-question-types";
import TextField from "../../../_common/text-field";
import Checkbox from "../../../_common/checkbox";
import Radio from "../../../_common/radio";

const { validateAnswerValue, validateAnswer } = validator.testAnswer;

const IsCorrectControl = ({ questionType, isCorrect, disabled, onCheck }) =>
  questionType === testQuestionTypes.singleAnswerQuestion ? (
    <Radio value={isCorrect} disabled={disabled} onChange={onCheck} />
  ) : questionType === testQuestionTypes.multiAnswerQuestion ? (
    <Checkbox value={isCorrect} disabled={disabled} onChange={onCheck} />
  ) : null;

const TestAnswerListItem = ({ answer, label, onAnswerUpdate }) => {
  const dispatch = useDispatch();
  const {
    question: { id: questionId, type: questionType },
    isAnswerUpdating,
  } = useSelector((state) => state.testDesign);
  const isTestSaving = useTestSaving();

  const [value, setValue] = useState(answer.value);
  const [isCorrect, setIsCorrect] = useState(answer.isCorrect);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsCorrect(answer.isCorrect);
  }, [answer.isCorrect]);

  const handleAnswerUpdate = (params) => {
    const updatedAnswer = { ...answer, questionId, value, isCorrect, ...params };
    const { isValid } = validateAnswer(updatedAnswer);

    if (isValid) {
      onAnswerUpdate(updatedAnswer);
    }
  };

  const handleDebouncedUpdate = useDebouncedUpdate(handleAnswerUpdate);

  const handleValueChange = (newValue) => {
    setValue(newValue);
    handleDebouncedUpdate.exec({ value: newValue });
    setError(null);
  };
  const handleValueFocusOut = () => {
    const validationError = validateAnswerValue(value);
    setError(validationError);
    handleDebouncedUpdate.execNow({ value });
  };

  const handleIsCorrectChange = (newValue) => {
    setIsCorrect(newValue);
    dispatch(updateCorrectTestAnswer({ answerId: answer.id }));
    handleAnswerUpdate({ isCorrect: newValue });
  };

  return (
    <div className="test-answer-list__item">
      <IsCorrectControl
        questionType={questionType}
        isCorrect={isCorrect}
        disabled={isTestSaving}
        onCheck={handleIsCorrectChange}
      />
      <TextField
        className="w-100"
        label={label}
        error={Boolean(error)}
        helperText={error}
        value={value}
        disabled={isTestSaving && !isAnswerUpdating}
        onChange={handleValueChange}
        onFocusOut={handleValueFocusOut}
      />
    </div>
  );
};

export default TestAnswerListItem;
