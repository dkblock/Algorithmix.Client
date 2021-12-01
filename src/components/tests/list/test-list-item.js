import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../../hooks";
import { getFileSrc } from "../../../utils/get-file-src";
import { stringifyDateTime } from "../../../utils/moment";
import CompletionResult from "../../_common/completion-result";
import { colors } from "../../_common/button";
import palette from "../../../utils/palette";

const TestListItem = ({ test }) => {
  const { isAuthenticated } = useCurrentUser();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const index = Math.floor(Math.random() * test.algorithms.length);
    setImage(getFileSrc(test.algorithms[index].imageUrl));
  }, []);

  return (
    <div className="test-list-item">
      <div className="test-list-item__info-container">
        <span className="test-list-item__title">{test.name}</span>
        <div className="test-list-item__info">
          <div>
            <span>Алгоритмы:</span> {test.algorithms.map((a) => a.name).join(", ")}
          </div>
          <div>
            <span>Количество вопросов:</span> {test.questions.length}
          </div>
          <div>
            <span>Автор: </span> {`${test.createdBy.firstName} ${test.createdBy.lastName}`}
          </div>
          <div>
            <span>Создан:</span> {stringifyDateTime(test.createdDate)}
          </div>
          <div className="flex-row">
            <span>Статус: </span>
            {test.userResult ? <span style={{ color: palette.success.main }}>Выполнен</span> : "Не выполнен"}
          </div>
        </div>
      </div>
      <div className="test-list-item__result">
        <CompletionResult value={test.averageResult} label="Средний результат" color={colors.primary} />
        {isAuthenticated && (
          <CompletionResult
            value={test.userResult ? test.userResult.result : 0}
            label="Ваш результат"
            color={colors.success}
          />
        )}
      </div>
      <div className="test-list-item__image-container">
        <img className="test-list-item__image" src={image} alt="test-image" />
      </div>
    </div>
  );
};

export default TestListItem;
