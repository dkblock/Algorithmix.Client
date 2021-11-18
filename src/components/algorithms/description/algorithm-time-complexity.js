import React from "react";

const AlgorithmTimeComplexity = ({ complexity }) => {
  const getValue = (value) => (value === null || value === "" ? "-" : value);
  return (
    <table className="algorithm-time-complexity-table">
      <thead>
        <tr>
          <th colSpan={4}>Асимптотическая сложность операций (по времени)</th>
        </tr>
        <tr>
          <th>Операция</th>
          <th>В худшем</th>
          <th>В среднем</th>
          <th>В лучшем</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Поиск</td>
          <td>{getValue(complexity.searchingWorstTime)}</td>
          <td>{getValue(complexity.searchingAverageTime)}</td>
          <td>{getValue(complexity.searchingBestTime)}</td>
        </tr>
        <tr>
          <td>Вставка</td>
          <td>{getValue(complexity.insertionWorstTime)}</td>
          <td>{getValue(complexity.insertionAverageTime)}</td>
          <td>{getValue(complexity.insertionBestTime)}</td>
        </tr>
        <tr>
          <td>Удаление</td>
          <td>{getValue(complexity.deletionWorstTime)}</td>
          <td>{getValue(complexity.deletionAverageTime)}</td>
          <td>{getValue(complexity.deletionBestTime)}</td>
        </tr>
        <tr>
          <td>Индексация</td>
          <td>{getValue(complexity.indexingWorstTime)}</td>
          <td>{getValue(complexity.indexingAverageTime)}</td>
          <td>{getValue(complexity.indexingBestTime)}</td>
        </tr>
        <tr>
          <td>Поиск максимума</td>
          <td>{getValue(complexity.findMaxElementWorstTime)}</td>
          <td>{getValue(complexity.findMaxElementAverageTime)}</td>
          <td>{getValue(complexity.findMaxElementBestTime)}</td>
        </tr>
        <tr>
          <td>Извлечение максимума</td>
          <td>{getValue(complexity.getMaxElementWorstTime)}</td>
          <td>{getValue(complexity.getMaxElementAverageTime)}</td>
          <td>{getValue(complexity.getMaxElementBestTime)}</td>
        </tr>
        <tr>
          <td>Сортировка</td>
          <td>{getValue(complexity.sortingWorstTime)}</td>
          <td>{getValue(complexity.sortingAverageTime)}</td>
          <td>{getValue(complexity.sortingBestTime)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default AlgorithmTimeComplexity;
