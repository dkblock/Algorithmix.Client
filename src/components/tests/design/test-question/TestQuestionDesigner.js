import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { Paper } from "@material-ui/core";
import { updateTestQuestion } from "../../../../store/actions/test-question";
import testQuestionTypes from "../../../../constants/test-question-types";
import validator from "../../../../utils/validation";
import TextField from "../../../_common/TextField";
import Dropdown from "../../../_common/Dropdown";
import TestQuestionImage from "./TestQuestionImage";
import TestAnswerList from "./TestAnswerList";

const { validateQuestionValue, validateQuestion } = validator.testQuestion;

const questionTypeItems = [
  { value: testQuestionTypes.singleAnswerQuestion, label: "С одним ответом" },
  { value: testQuestionTypes.multiAnswerQuestion, label: "С несколькими ответами" },
  { value: testQuestionTypes.freeAnswerQuestion, label: "Со свободным ответом" },
];

const TestQuestionDesigner = () => {
  const dispatch = useDispatch();
  const { test, question } = useSelector((state) => state.testDesign);
  const { id: testId } = test;

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
        dispatch(updateTestQuestion({ testId, questionId, question: { ...updatedQuestion, testId } }));
      }
    },
    [dispatch, questionId, testId]
  );

  const handleQuestionValueChange = useDebouncedCallback((newValue) => {
    setValue(newValue);
    handleUpdateQuestion({ ...question, value: newValue });
  }, 1000);
  const handleQuestionValueFocus = useCallback(() => setValidationErrors({ ...validationErrors, value: null }), [
    validationErrors,
  ]);
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

  if (!question) return null;

  return (
    <Paper className="test-question-info">
      <div className="test-question-info__main">
        <section className="test-question-info__section test-question-info__section--left">
          <TextField
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
          <Dropdown label="Тип вопроса" value={type} items={questionTypeItems} onChange={handleQuestionTypeChange} />
        </section>
        <TestQuestionImage question={question} />
      </div>
      <TestAnswerList />
    </Paper>
  );
};

export default TestQuestionDesigner;
