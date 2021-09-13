import React from "react";
import { useCurrentUser } from "../../../hooks";
import { getFileSrc } from "../../../utils/get-file-src";
import { navigateToTestPass, navigateToTestResult } from "../../../utils/navigator";
import CompletionResult from "../../_common/completion-result";
import Button, { colors } from "../../_common/button";
import { iconTypes } from "../../_common/icon";
import palette from "../../../utils/palette";

const TestListItem = ({ test }) => {
  const { isAuthenticated } = useCurrentUser();
  const algorithms = test.algorithms.map(a => a.name).join(", ");

  const handleTestStart = () => navigateToTestPass(test.id);
  const handleTestResult = () => navigateToTestResult(test.id);

  return (
    <div className="test-list-item">
      <section className="test-list-item__info">
        <span className="test-list-item__title">{test.name}</span>
        <div>
          <span>Алгоритмы:</span> {algorithms}
        </div>
        <div>
          <span>Количество вопросов:</span> {test.questions.length}
        </div>
        <div>
          <span>Автор: </span> {`${test.createdBy.firstName} ${test.createdBy.lastName}`}
        </div>
        <div>
          <span>Создан:</span> {new Date(test.createdDate).toLocaleDateString("ru-RU")}
        </div>
        <div className="flex-row">
          <span>Статус:</span>{" "}
          {test.userResult ? <span style={{ color: palette.success.main }}>Выполнен</span> : "Не выполнен"}
        </div>
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
            <CompletionResult
              value={test.userResult ? test.userResult.result : 0}
              color="success"
              size="large"
              label="Ваш результат"
            />
          )}
          <CompletionResult value={test.averageResult} color="primary" size="large" label="Средний результат" />
        </>
      </section>
      {/*<section className="test-list-item__image">*/}
      {/*  <img className="w-100" src={getFileSrc(test.algorithm.imageUrl)} alt="test-image" />*/}
      {/*</section>*/}
    </div>
  );
};

export default TestListItem;
