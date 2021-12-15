import React from "react";
import Tooltip from "../../_common/tooltip";
import { Icon, iconTypes } from "../../_common/icon";

const AlgorithmTimeComplexity = ({ complexity }) => {
  const getValue = (value) => (value === null || value === "" ? "-" : value);
  return (
    <table className="algorithm-time-complexity-table">
      <thead>
        <tr>
          <th colSpan={2}>
            <div className="algorithm-time-complexity-table__header">
              <span>Временная сложность операций алгоритма</span>
              <Tooltip placement="bottom" title="Время работы в наихудшем случае">
                <Icon type={iconTypes.info} size="small" color="primary"/>
              </Tooltip>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="w-50">Поиск</td>
          <td>{getValue(complexity.searchingWorstTime)}</td>
        </tr>
        <tr>
          <td>Вставка</td>
          <td>{getValue(complexity.insertionWorstTime)}</td>
        </tr>
        <tr>
          <td>Удаление</td>
          <td>{getValue(complexity.deletionWorstTime)}</td>
        </tr>
        <tr>
          <td>Индексация</td>
          <td>{getValue(complexity.indexingWorstTime)}</td>
        </tr>
        <tr>
          <td>Поиск максимума</td>
          <td>{getValue(complexity.findMaxElementWorstTime)}</td>
        </tr>
        <tr>
          <td>Извлечение максимума</td>
          <td>{getValue(complexity.getMaxElementWorstTime)}</td>
        </tr>
        <tr>
          <td>Сортировка</td>
          <td>{getValue(complexity.sortingWorstTime)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default AlgorithmTimeComplexity;
