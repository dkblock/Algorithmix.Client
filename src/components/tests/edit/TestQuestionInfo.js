import React, { useCallback, useState } from "react";
import { Paper } from "@material-ui/core";
import TextField from "../../_common/TextField";
import Dropdown from "../../_common/Dropdown";
import testQuestionTypes from "../../../constants/test-question-types";

const questionTypeItems = [
  { value: testQuestionTypes.singleAnswerQuestion, name: "С одним ответом" },
  { value: testQuestionTypes.multiAnswerQuestion, name: "С несколькими ответами" },
  { value: testQuestionTypes.freeAnswerQuestion, name: "Со свободным ответом" },
];

const TestQuestionInfo = ({ question }) => {
  const [questionValue, setQuestionValue] = useState(question?.value);
  const [questionType, setQuestionType] = useState(question?.type);
  const [validationErrors, setValidationErrors] = useState({});

  const handleQuestionValueChange = useCallback((value) => {
    setQuestionValue(value);
  }, []);

  const handleQuestionValueFocus = useCallback(() => {
    setValidationErrors({ ...validationErrors, questionValue: null });
  }, [validationErrors]);

  const handleQuestionValueFocusOut = useCallback(() => {
    // validate
  }, [questionValue, validationErrors]);

  const handleQuestionTypeChange = useCallback((value) => {
    setQuestionType(value);
  }, []);

  if (!question) {
    return null;
  }

  return (
    <Paper className="test-question-info">
      <TextField
        className="test-form__control"
        label="Вопрос"
        error={Boolean(validationErrors.questionValue)}
        helperText={validationErrors.questionValue}
        value={questionValue}
        multiline
        rows={5}
        onChange={handleQuestionValueChange}
        onFocus={handleQuestionValueFocus}
        onFocusOut={handleQuestionValueFocusOut}
      />
      <Dropdown
        className="test-form__control"
        label="Тип вопроса"
        value={questionType}
        items={questionTypeItems}
        onChange={handleQuestionTypeChange}
      />
    </Paper>
  );
};

export default TestQuestionInfo;
