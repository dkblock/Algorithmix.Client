import React from "react";
import { useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { Divider } from "@material-ui/core";
import { navigateToTestPass, navigateToTestResult } from "../../../utils/navigator";
import { getImageSrc } from "../../../utils/get-image-src";
import Button, { colors } from "../../_common/Button";
import { iconTypes } from "../../_common/Icon";
import CompletionResult from "../../_common/CompletionResult";

const TestInfo = ({ testId }) => {
  const { isAuthenticated } = useSelector((state) => state.account);
  const { publishedTests: tests } = useSelector((state) => state.test);
  const test = tests.find((t) => t.id === testId);

  const handleTestStart = () => {
    navigateToTestPass(testId);
  };

  const handleTestResult = () => {
    navigateToTestResult(testId);
  };

  if (!test) return null;

  return (
    <Paper className="test-info">
      <div className="test-info__main">
        <h4>{test.name}</h4>
        <Divider className="test-info__divider" />
        <div className="test-info__content">
          <section className="test-info__section">
            <div>
              <span>Алгоритм:</span> {test.algorithm.name}
            </div>
            <div>
              <span>Количество вопросов:</span> {test.questions.length}
            </div>
            <div>
              <span>Создан:</span> {new Date(test.createdDate).toLocaleDateString("ru-RU")}
            </div>
            <div>
              <span>Автор:</span> {`${test.createdBy.firstName} ${test.createdBy.lastName}`}
            </div>
            <div>
              <span>Статус:</span> {test.userResult ? "Выполнен" : "Не выполнен"}
            </div>
          </section>
          <section className="test-info__section">
            <img className="test-info__image" src={getImageSrc(test.algorithm.imageUrl)} alt="algorithm-image" />
          </section>
        </div>
      </div>
      <div className="test-info__footer">
        <div className="test-info__result">
          {isAuthenticated && (
            <CompletionResult value={test.userResult ? test.userResult.result : 0} size="large" label="Ваш результат" />
          )}
          <CompletionResult value={test.averageResult} size="large" label="Средний результат" />
        </div>
        {isAuthenticated &&
          (test.userResult ? (
            <Button color={colors.success} endIcon={iconTypes.help} onClick={handleTestResult}>
              Подробно
            </Button>
          ) : (
            <Button color={colors.success} endIcon={iconTypes.play} onClick={handleTestStart}>
              Начать тест
            </Button>
          ))}
      </div>
    </Paper>
  );
};

export default TestInfo;
