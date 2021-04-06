import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SortableList } from "../../_common/List";
import Loader from "../../_common/Loader";
import Button, { colors } from "../../_common/Button";
import { iconTypes } from "../../_common/Icon";
import { createTestQuestion, selectTestQuestion } from "../../../store/actions/test-question";

const prepareQuestions = (questions, selectedQuestion, onClick) =>
  questions.map((question, index) => ({
    id: question.id,
    primaryText: question.value || "Введите вопрос",
    isSelected: question.id === selectedQuestion.id,
    index: index + 1,
    onClick: () => onClick(question),
    actions: [
      {
        id: "delete",
        label: "Удалить",
        icon: iconTypes.delete,
        onClick: () => {},
      },
    ],
  }));

const TestQuestionList = () => {
  const dispatch = useDispatch();
  const { selectedTest: test } = useSelector((state) => state.test);
  const { questions, selectedQuestion, isFetching } = useSelector((state) => state.testQuestion);

  const handleQuestionClick = useCallback((question) => {
    dispatch(selectTestQuestion(question));
  }, []);

  const handleCreateQuestion = () => dispatch(createTestQuestion(test.id));

  const preparedQuestions = prepareQuestions(questions, selectedQuestion, handleQuestionClick);

  return (
    <div className="test-question-list">
      <div className="test-question-list__header">
        <h5>{test.name}</h5>
        <Button color={colors.success} startIcon={iconTypes.plus} onClick={handleCreateQuestion}>
          Новый вопрос
        </Button>
      </div>
      <div className="test-question-list__items">
        {isFetching ? (
          <Loader />
        ) : preparedQuestions.length > 0 ? (
          <SortableList items={preparedQuestions} onSort={() => {}} />
        ) : (
          <div>Ничего нет</div>
        )}
      </div>
    </div>
  );
};

export default TestQuestionList;
