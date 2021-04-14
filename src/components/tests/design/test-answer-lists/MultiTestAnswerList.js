import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTestAnswer, moveTestAnswer } from "../../../../store/actions/test-answer";
import { IconButton, iconTypes } from "../../../_common/Icon";
import { SortableList } from "../../../_common/List";
import TextField from "../../../_common/TextField";

const prepareAnswers = (answers, onAnswerDelete) =>
  answers.map((answer) => ({
    id: answer.id,
    checked: answer.isCorrect,
    content: (
      <div className="test-answer-list__item">
        <TextField value={answer.value} />
      </div>
    ),
    actions: [
      {
        id: "delete",
        label: "Удалить",
        icon: iconTypes.delete,
        onClick: () => onAnswerDelete(answer.id),
      },
    ],
  }));

const MultiTestAnswerList = ({ onCreateAnswer }) => {
  const dispatch = useDispatch();
  const { answers, isSaving } = useSelector((state) => state.testAnswer);
  const { selectedQuestion: question } = useSelector((state) => state.testQuestion);
  const testId = question.test.id;
  const questionId = question.id;

  const [orderedAnswers, setOrderedAnswers] = useState([]);

  useEffect(() => {
    setOrderedAnswers(answers);
  }, [answers]);

  const handleAnswerDelete = useCallback(
    (answerId) => {
      dispatch(deleteTestAnswer({ testId, questionId, answerId }));
    },
    [dispatch, questionId, testId]
  );

  const handleAnswerMove = useCallback(
    (newAnswers, oldIndex, newIndex) => {
      if (!isSaving && oldIndex !== newIndex) {
        const newOrderedAnswers = newAnswers.map(({ id }) => orderedAnswers.find((a) => a.id === id));
        setOrderedAnswers(newOrderedAnswers);
        dispatch(
          moveTestAnswer({
            testId,
            questionId,
            indexes: { oldIndex, newIndex },
          })
        );
      }
    },
    [dispatch, isSaving, orderedAnswers, questionId, testId]
  );

  const preparedAnswers = useMemo(() => prepareAnswers(orderedAnswers, handleAnswerDelete), [
    handleAnswerDelete,
    orderedAnswers,
  ]);

  return (
    <div className="test-answer-list">
      <div className="test-answer-list__header">
        Ответы
        <IconButton type={iconTypes.plus} onClick={onCreateAnswer} />
      </div>
      <div className="test-answer-list__items">
        {preparedAnswers.length > 0 ? (
          <SortableList
            items={preparedAnswers}
            onSwap={handleAnswerMove}
            onCheck={(ids) => console.log(ids)}
            checkControlType="checkbox"
          />
        ) : (
          <div>Добавьте ответ</div>
        )}
      </div>
    </div>
  );
};

export default MultiTestAnswerList;
