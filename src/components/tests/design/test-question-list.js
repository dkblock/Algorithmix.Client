import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTestQuestion,
  showDeleteTestQuestionModal,
  moveTestQuestion,
  fetchTestQuestion,
} from "../../../store/actions/test-question";
import Button, { colors } from "../../_common/button";
import { iconTypes } from "../../_common/icon";
import Loader from "../../_common/loader";
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
  const { test, question: selectedQuestion, questions, isSaving, isFetching } = useSelector(
    (state) => state.testDesign
  );

  const [orderedQuestions, setOrderedQuestions] = useState([]);

  useEffect(() => {
    setOrderedQuestions(questions);
  }, [questions]);

  const handleQuestionClick = useCallback(
    (questionId) => {
      dispatch(fetchTestQuestion({ testId: test.id, questionId }));
    },
    [dispatch, test.id]
  );

  const handleQuestionCreate = useCallback(
    () => dispatch(createTestQuestion({ testId: test.id, count: questions.length })),
    [dispatch, test.id, questions.length]
  );

  const handleQuestionDelete = useCallback(
    (questionId) => {
      dispatch(showDeleteTestQuestionModal({ testId: test.id, questionId }));
    },
    [dispatch, test.id]
  );

  const handleQuestionMove = useCallback(
    (newQuestions, oldIndex, newIndex) => {
      if (!isSaving && oldIndex !== newIndex) {
        const newOrderedQuestions = newQuestions.map(({ id }) => orderedQuestions.find((q) => q.id === id));
        setOrderedQuestions(newOrderedQuestions);
        dispatch(moveTestQuestion({ testId: test.id, indexes: { oldIndex, newIndex } }));
      }
    },
    [isSaving, orderedQuestions, dispatch, test.id]
  );

  const preparedQuestions = useMemo(
    () => prepareQuestions(orderedQuestions, selectedQuestion?.id, handleQuestionClick, handleQuestionDelete),
    [handleQuestionClick, handleQuestionDelete, orderedQuestions, selectedQuestion]
  );

  return (
    <div className="test-question-list">
      <div className="test-question-list__header">
        Вопросы
        <Button color={colors.success} startIcon={iconTypes.plus} onClick={handleQuestionCreate}>
          Новый вопрос
        </Button>
      </div>
      <div className="test-question-list__items">
        {isFetching ? (
          <Loader className="test-list__loader" />
        ) : preparedQuestions.length > 0 ? (
          <SortableList items={preparedQuestions} onSwap={handleQuestionMove} />
        ) : (
          <div className="test-list__loader">Нет вопросов</div>
        )}
      </div>
    </div>
  );
};

export default TestQuestionList;
