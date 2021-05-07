import React from "react";
import { useCurrentUser } from "../../../hooks";
import { getImageSrc } from "../../../utils/get-image-src";
import { navigateToTestPass, navigateToTestResult } from "../../../utils/navigator";
import CompletionResult from "../../_common/CompletionResult";
import Button, { colors } from "../../_common/Button";
import { iconTypes } from "../../_common/Icon";

const TestListItem = ({ test }) => {
  const { isAuthenticated } = useCurrentUser();

  const handleTestStart = () => navigateToTestPass(test.id);
  const handleTestResult = () => navigateToTestResult(test.id);

  return (
    <div className="test-list-item">
      <section className="test-list-item__info">
        <span className="test-list-item__title">{test.name}</span>
        <span>Алгоритм: {test.algorithm.name}</span>
        <span>Количество вопросов: {test.questions.length}</span>
        <span>Создан: {new Date(test.createdDate).toLocaleDateString("ru-RU")}</span>
        <span>Автор: {`${test.createdBy.firstName} ${test.createdBy.lastName}`}</span>
        <span>Статус: {test.userResult ? "Выполнен" : "Не выполнен"}</span>
      </section>
      <section className="test-list-item__status">
        {isAuthenticated &&
          (test.userResult ? (
            <Button color={colors.success} endIcon={iconTypes.stats} onClick={handleTestResult}>
              Результат
            </Button>
          ) : (
            <Button color={colors.primary} endIcon={iconTypes.play} onClick={handleTestStart}>
              Начать тест
            </Button>
          ))}
      </section>
      <section className="test-list-item__result">
        <>
          {isAuthenticated && (
            <CompletionResult value={test.userResult ? test.userResult.result : 0} size="large" label="Ваш результат" />
          )}
          <CompletionResult value={test.averageResult} size="large" label="Средний результат" />
        </>
      </section>
      <section className="test-list-item__image">
        <img className="w-100" src={getImageSrc(test.algorithm.imageUrl)} alt="test-image" />
      </section>
    </div>
  );
};

export default TestListItem;
