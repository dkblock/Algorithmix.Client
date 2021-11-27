import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@mui/material";
import { useDebouncedUpdate } from "../../../../hooks";
import { updateTestQuestion } from "../../../../store/actions/test-question";
import testQuestionTypes from "../../../../constants/test-question-types";
import validator from "../../../../utils/validation";
import TextField from "../../../_common/text-field";
import Dropdown from "../../../_common/dropdown";
import Loader from "../../../_common/loader";
import TestQuestionImageDesigner from "./test-question-image-designer";
import TestAnswerList from "./test-answer-list";

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

  const handleUpdateQuestion = (params) => {
    const updatedQuestion = { ...question, testId, value, type, ...params };
    const { isValid } = validateQuestion(updatedQuestion);

    if (isValid) {
      dispatch(updateTestQuestion({ testId, questionId, question: updatedQuestion }));
    }
  };

  const handleUpdateDebounced = useDebouncedUpdate(handleUpdateQuestion);

  const handleQuestionValueChange = (newValue) => {
    setValue(newValue);
    handleUpdateDebounced.exec({ value: newValue });
    setValidationErrors({ ...validationErrors, value: null });
  };
  const handleQuestionValueFocusOut = () => {
    const validationError = validateQuestionValue(value);

    if (!validationError) {
      handleUpdateDebounced.execNow({ value });
    } else {
      setValidationErrors({ ...validationErrors, value: validationError });
    }
  };

  const handleQuestionTypeChange = (newValue) => {
    setType(newValue);
    handleUpdateQuestion({ type: newValue });
  };

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
                onFocusOut={handleQuestionValueFocusOut}
              />
              <Dropdown
                label="Тип вопроса"
                value={type}
                items={questionTypeItems}
                onChange={handleQuestionTypeChange}
              />
            </section>
            <TestQuestionImageDesigner question={question} />
          </div>
          <TestAnswerList />
        </>
      )}
    </Paper>
  );
};

export default TestQuestionDesigner;
