import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Paper } from "@material-ui/core";
import { updateTestQuestion } from "../../../store/actions/test-question";
import testQuestionTypes from "../../../constants/test-question-types";
import validator from "../../../utils/validator";
import TextField from "../../_common/TextField";
import Dropdown from "../../_common/Dropdown";

const { validateQuestionValue, validateQuestion } = validator.testQuestion;

const questionTypeItems = [
  { value: testQuestionTypes.singleAnswerQuestion, name: "С одним ответом" },
  { value: testQuestionTypes.multiAnswerQuestion, name: "С несколькими ответами" },
  { value: testQuestionTypes.freeAnswerQuestion, name: "Со свободным ответом" },
];

const TestQuestionInfo = () => {
  const dispatch = useDispatch();
  const { testId } = useParams();
  const { selectedQuestion: question } = useSelector((state) => state.testQuestion);

  const [questionId, setQuestionId] = useState(null);
  const [value, setValue] = useState("");
  const [type, setType] = useState(testQuestionTypes.singleAnswerQuestion);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (question) {
      setQuestionId(question.id);
      setValue(question.value);
      setType(question.type);
      setValidationErrors({});
    }
  }, [question?.id]);

  const handleUpdateQuestion = useCallback(
    (updatedQuestion) => {
      const { isValid } = validateQuestion(updatedQuestion);

      if (isValid) {
        dispatch(
          updateTestQuestion({
            testId,
            questionId,
            question: { ...updatedQuestion, testId: parseInt(testId) },
          })
        );
      }
    },
    [dispatch, questionId, testId]
  );

  const handleQuestionValueChange = useCallback(
    (newValue) => {
      setValue(newValue);
      handleUpdateQuestion({ ...question, value: newValue });
    },
    [handleUpdateQuestion, question]
  );

  const handleQuestionValueFocus = useCallback(() => {
    setValidationErrors({ ...validationErrors, value: null });
  }, [validationErrors]);

  const handleQuestionValueFocusOut = useCallback(() => {
    const validationError = validateQuestionValue(value);
    setValidationErrors({ ...validationErrors, value: validationError });
  }, [value, validationErrors]);

  const handleQuestionTypeChange = useCallback(
    (newValue) => {
      setType(newValue);
      handleUpdateQuestion({ ...question, type: newValue });
    },
    [handleUpdateQuestion, question]
  );

  if (!question) {
    return null;
  }

  return (
    <Paper className="test-question-info">
      <TextField
        className="test-form__control"
        label="Вопрос"
        error={Boolean(validationErrors.value)}
        helperText={validationErrors.value}
        value={value}
        multiline
        rows={5}
        onChange={handleQuestionValueChange}
        onFocus={handleQuestionValueFocus}
        onFocusOut={handleQuestionValueFocusOut}
      />
      <Dropdown
        className="test-form__control"
        label="Тип вопроса"
        value={type}
        items={questionTypeItems}
        onChange={handleQuestionTypeChange}
      />
    </Paper>
  );
};

export default TestQuestionInfo;
