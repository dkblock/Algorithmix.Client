import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { Paper } from "@mui/material";
import { updateTestQuestion } from "../../../../store/actions/test-question";
import testQuestionTypes from "../../../../constants/test-question-types";
import validator from "../../../../utils/validation";
import TextField from "../../../_common/text-field";
import Dropdown from "../../../_common/dropdown";
import TestQuestionImage from "./test-question-image";
import TestAnswerList from "./test-answer-list";
import Loader from "../../../_common/loader";

const { validateQuestionValue, validateQuestion } = validator.testQuestion;

const questionTypeItems = [
  { value: testQuestionTypes.singleAnswerQuestion, label: "С одним ответом" },
  { value: testQuestionTypes.multiAnswerQuestion, label: "С несколькими ответами" },
  { value: testQuestionTypes.freeAnswerQuestion, label: "Со свободным ответом" },
];

const TestQuestionDesigner = () => {
  const dispatch = useDispatch();
  const { test, question, isQuestionFetching } = useSelector((state) => state.testDesign);

  const { id: testId } = test;
  const { id: questionId } = question;

  const [value, setValue] = useState(question.value);
  const [type, setType] = useState(question.type);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setValue(question.value);
    setType(question.type);
  }, [questionId]);

  const handleUpdateQuestion = useCallback(
    (params) => {
      const updatedQuestion = { ...question, testId, value, type, ...params };
      const { isValid } = validateQuestion(updatedQuestion);

      if (isValid) {
        dispatch(updateTestQuestion({ testId, questionId, question: updatedQuestion }));
      }
    },
    [dispatch, testId, questionId, value, type]
  );

  const handleUpdateQuestionValueDebounced = useDebouncedCallback((value) => {
    handleUpdateQuestion({ value });
  }, 500);

  const handleQuestionValueChange = useCallback(
    (newValue) => {
      setValue(newValue);
      handleUpdateQuestionValueDebounced(newValue);
    },
    [handleUpdateQuestionValueDebounced]
  );

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
      handleUpdateQuestion({ type: newValue });
    },
    [handleUpdateQuestion]
  );

  return (
    <Paper className="test-question-info">
      {isQuestionFetching ? (
        <Loader className="m-auto" />
      ) : (
        <>
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
              <Dropdown
                label="Тип вопроса"
                value={type}
                items={questionTypeItems}
                onChange={handleQuestionTypeChange}
              />
            </section>
            <TestQuestionImage question={question} />
          </div>
          <TestAnswerList />
        </>
      )}
    </Paper>
  );
};

export default TestQuestionDesigner;
