import React from "react";
import CompletionResult from "../../_common/completion-result";

const TestStatsInfo = ({ test }) => (
  <div className="test-stats__header">
    <div className="test-stats__info">
      <div className="test-stats__title">{test.name}</div>
      <table>
        <tbody>
          <tr>
            <td colSpan={2}>
              <span>Алгоритмы:</span> {test.algorithms.map((a) => a.name).join(", ")}
            </td>
          </tr>
          <tr>
            <td>
              <span>Всего вопросов:</span> {test.questions.length}
            </td>
          </tr>
          <tr>
            <td>
              <span>Пройден раз:</span> {test.passesCount}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <CompletionResult value={test.averageResult} label="Средний результат" size="medium" />
  </div>
);

export default TestStatsInfo;
