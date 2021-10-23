import React from "react";
import CompletionResult from "../../_common/completion-result";
import colors from "../../../constants/colors";

const UserTestResultInfo = ({ testResult, own }) => (
  <div className="test-result__header">
    <div className="test-result__info">
      <div className="test-result__title">{testResult.test.name}</div>
      <table>
        <tbody>
          <tr>
            <td width={450}>
              <span>Всего вопросов:</span> {testResult.test.questions.length}
            </td>
            {!own && (
              <td>
                <span>Пользователь:</span> {testResult.user.firstName} {testResult.user.lastName}
              </td>
            )}
          </tr>
          <tr>
            <td>
              <span>Правильных ответов:</span> {testResult.correctAnswers}
            </td>
            {!own && (
              <td>
                <span>Группа:</span> {testResult.user.group.name}
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
    <CompletionResult
      value={testResult.result}
      label={own ? "Ваш результат" : "Результат"}
      size="medium"
    />
  </div>
);

export default UserTestResultInfo;
