import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTestQuestion,
  selectTestQuestion,
  showDeleteTestQuestionModal,
  moveTestQuestions,
} from "../../../store/actions/test-question";
import { iconTypes } from "../../_common/Icon";
import Button, { colors } from "../../_common/Button";
import { SortableList } from "../../_common/List";
import Loader from "../../_common/Loader";
import { useParams } from "react-router";

const prepareQuestions = (questions, selectedQuestion, onClick, onQuestionDelete) =>
  questions.map((question, index) => ({
    id: question.id,
    primaryText: question.value,
    isSelected: question.id === selectedQuestion?.id,
    index: index + 1,
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
  const { testId } = useParams();
  const { tests, isFetching: isTestFetching } = useSelector((state) => state.test);
  const { questions, selectedQuestion, isSaving, isFetching: isQuestionsFetching } = useSelector(
    (state) => state.testQuestion
  );

  const [orderedQuestions, setOrderedQuestions] = useState([]);
  const test = tests.find((t) => t.id === parseInt(testId));

  useEffect(() => {
    setOrderedQuestions(questions);
  }, [questions]);

  const handleQuestionClick = useCallback(
    (question) => {
      dispatch(selectTestQuestion({ question }));
    },
    [dispatch]
  );

  const handleQuestionDelete = useCallback(
    (question) => {
      dispatch(showDeleteTestQuestionModal({ testId: parseInt(testId), questionId: question.id }));
    },
    [dispatch, testId]
  );

  const handleQuestionMove = useCallback(
    (newQuestions, oldIndex, newIndex) => {
      if (!isSaving) {
        const newOrderedQuestions = newQuestions.map(({ id }) => questions.find((q) => q.id === id));
        setOrderedQuestions(newOrderedQuestions);
        dispatch(moveTestQuestions({ testId: parseInt(testId), indexes: { oldIndex, newIndex } }));
      }
    },
    [dispatch, isSaving, questions, testId]
  );

  const handleQuestionCreate = useCallback(
    () =>
      dispatch(
        createTestQuestion({
          testId: parseInt(testId),
          count: questions.length,
        })
      ),
    [dispatch, questions.length, testId]
  );

  const preparedQuestions = prepareQuestions(
    orderedQuestions,
    selectedQuestion,
    handleQuestionClick,
    handleQuestionDelete
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
