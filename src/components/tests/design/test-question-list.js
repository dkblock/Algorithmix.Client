import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTestQuestion,
  showDeleteTestQuestionModal,
  moveTestQuestion,
  fetchTestQuestion,
} from "../../../store/actions/test-question";
import { Button, colors } from "../../_common/button";
import { iconTypes } from "../../_common/icon";
import { Loader } from "../../_common/loader";
import { SortableList } from "../../_common/list";

const prepareQuestions = (questions, selectedQuestionId, onQuestionClick, onQuestionDelete) =>
  questions.map((question) => ({
    id: question.id,
    primaryText: question.value.length <= 50 ? question.value : `${question.value.substring(0, 50)}...`,
    isSelected: question.id === selectedQuestionId,
    onClick: () => onQuestionClick(question.id),
    actions: [
      {
        id: "delete",
        label: "Удалить",
        icon: iconTypes.delete,
        onClick: () => onQuestionDelete(question.id),
      },
    ],
  }));

const TestQuestionList = () => {
  const dispatch = useDispatch();
  const { test, question: selectedQuestion, questions, isFetching, isQuestionMoving, isQuestionCreating } = useSelector(
    (state) => state.testDesign
  );

  const [orderedQuestions, setOrderedQuestions] = useState([]);

  useEffect(() => {
    setOrderedQuestions(questions);
  }, [questions]);

  const handleQuestionClick = (questionId) => dispatch(fetchTestQuestion({ testId: test.id, questionId }));
  const handleQuestionCreate = () => dispatch(createTestQuestion({ testId: test.id, count: questions.length }));
  const handleQuestionDelete = (questionId) => dispatch(showDeleteTestQuestionModal({ testId: test.id, questionId }));
  const handleQuestionMove = (newQuestions, oldIndex, newIndex) => {
    if (!isQuestionMoving && oldIndex !== newIndex) {
      const newOrderedQuestions = newQuestions.map(({ id }) => orderedQuestions.find((q) => q.id === id));
      setOrderedQuestions(newOrderedQuestions);
      dispatch(moveTestQuestion({ testId: test.id, indexes: { oldIndex, newIndex } }));
    }
  };

  const preparedQuestions = useMemo(
    () => prepareQuestions(orderedQuestions, selectedQuestion?.id, handleQuestionClick, handleQuestionDelete),
    [handleQuestionClick, handleQuestionDelete, orderedQuestions, selectedQuestion]
  );

  return (
    <div className="test-question-list">
      <div className="test-question-list__header">
        Вопросы ({preparedQuestions.length})
        <Button
          color={colors.success}
          startIcon={iconTypes.plus}
          isLoading={isQuestionCreating}
          loadingPosition="start"
          onClick={handleQuestionCreate}
        >
          Новый вопрос
        </Button>
      </div>
      <div className="test-question-list__items">
        {isFetching ? (
          <Loader className="test-list__loader" />
        ) : preparedQuestions.length > 0 ? (
          <SortableList
            items={preparedQuestions}
            disabled={isQuestionMoving || isQuestionCreating}
            onSwap={handleQuestionMove}
          />
        ) : (
          <div className="test-list__loader">Нет вопросов</div>
        )}
      </div>
    </div>
  );
};

export default TestQuestionList;
