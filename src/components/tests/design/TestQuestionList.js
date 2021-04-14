import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTestQuestion,
  selectTestQuestion,
  showDeleteTestQuestionModal,
  moveTestQuestion,
} from "../../../store/actions/test-question";
import { fetchTestAnswers } from "../../../store/actions/test-answer";
import { iconTypes } from "../../_common/Icon";
import Button, { colors } from "../../_common/Button";
import { SortableList } from "../../_common/List";
import Loader from "../../_common/Loader";

const prepareQuestions = (questions, selectedQuestion, onClick, onQuestionDelete) =>
  questions.map((question) => ({
    id: question.id,
    primaryText: question.value,
    isSelected: question.id === selectedQuestion?.id,
    onClick: () => onClick(question),
    actions: [
      {
        id: "delete",
        label: "Удалить",
        icon: iconTypes.delete,
        onClick: () => onQuestionDelete(question),
      },
    ],
  }));

const TestQuestionList = () => {
  const dispatch = useDispatch();
  const { editedTest: test, isFetching: isTestFetching } = useSelector((state) => state.test);
  const { questions, selectedQuestion, isSaving, isFetching: isQuestionsFetching } = useSelector(
    (state) => state.testQuestion
  );

  const [orderedQuestions, setOrderedQuestions] = useState([]);

  useEffect(() => {
    setOrderedQuestions(questions);
  }, [questions]);

  const handleQuestionClick = useCallback(
    (question) => {
      dispatch(selectTestQuestion({ question }));
      dispatch(fetchTestAnswers({ testId: test.id, questionId: question.id }));
    },
    [dispatch, test.id]
  );

  const handleQuestionDelete = useCallback(
    (question) => {
      dispatch(showDeleteTestQuestionModal({ testId: test.id, questionId: question.id }));
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

  const handleQuestionCreate = useCallback(
    () =>
      dispatch(
        createTestQuestion({
          testId: test.id,
          count: questions.length,
        })
      ),
    [dispatch, test.id, questions.length]
  );

  const preparedQuestions = useMemo(
    () => prepareQuestions(orderedQuestions, selectedQuestion, handleQuestionClick, handleQuestionDelete),
    [handleQuestionClick, handleQuestionDelete, orderedQuestions, selectedQuestion]
  );

  return (
    <div className="test-question-list">
      {isTestFetching ? (
        <Loader className="test-list__loader" />
      ) : (
        <>
          <div className="test-question-list__header">
            <h5>{test.name}</h5>
            <Button color={colors.success} startIcon={iconTypes.plus} onClick={handleQuestionCreate}>
              Новый вопрос
            </Button>
          </div>

          {isQuestionsFetching ? (
            <Loader className="test-list__loader" />
          ) : (
            <div className="test-question-list__items">
              {preparedQuestions.length > 0 ? (
                <SortableList items={preparedQuestions} onSwap={handleQuestionMove} />
              ) : (
                <div>Нет вопросов</div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TestQuestionList;
