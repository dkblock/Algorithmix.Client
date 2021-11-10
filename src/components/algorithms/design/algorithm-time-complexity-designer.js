import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { updateAlgorithmTimeComplexity } from "../../../store/actions/algorithm";
import TextField from "../../_common/text-field";

const SpecificTextField = ({ timeComplexity, param, onParamChange, onParamFocusOut }) => (
  <td>
    <TextField
      className="w-100"
      value={timeComplexity[param] ?? ""}
      variant="standard"
      onChange={(value) => onParamChange(param, value)}
      onFocusOut={onParamFocusOut}
    />
  </td>
);

const AlgorithmTimeComplexityDesigner = () => {
  const dispatch = useDispatch();
  const { algorithm } = useSelector((state) => state.algorithmDesign);

  const [timeComplexity, setTimeComplexity] = useState(algorithm.timeComplexity);

  const handleAlgorithmTimeComplexityUpdate = useCallback(() => {
    dispatch(updateAlgorithmTimeComplexity({ algorithmId: algorithm.id, timeComplexity }));
  }, [timeComplexity]);

  const handleParamChangeDebounced = useDebouncedCallback(() => {
    handleAlgorithmTimeComplexityUpdate();
  }, 500);

  const handleParamChange = useCallback(
    (paramName, value) => {
      setTimeComplexity((prevState) => ({ ...prevState, [paramName]: value }));
      handleParamChangeDebounced();
    },
    [handleParamChangeDebounced]
  );

  const handleParamFocusOut = useCallback(() => {
    handleParamChangeDebounced.cancel();
    handleAlgorithmTimeComplexityUpdate();
  }, [timeComplexity]);

  return (
    <div className="algorithm-time-complexity-designer">
      <table className="algorithm-time-complexity-designer__table">
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
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="searchingWorstTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="searchingAverageTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="searchingBestTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
          </tr>
          <tr>
            <td>Вставка</td>
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="insertionWorstTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="insertionAverageTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="insertionBestTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
          </tr>
          <tr>
            <td>Удаление</td>
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="deletionWorstTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="deletionAverageTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="deletionBestTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
          </tr>
          <tr>
            <td>Индексация</td>
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="indexingWorstTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="indexingAverageTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="indexingBestTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
          </tr>
          <tr>
            <td>Поиск максимума</td>
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="findMaxElementWorstTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="findMaxElementAverageTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="findMaxElementBestTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
          </tr>
          <tr>
            <td>Извлечение максимума</td>
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="getMaxElementWorstTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="getMaxElementAverageTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="getMaxElementBestTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
          </tr>
          <tr>
            <td>Сортировка</td>
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="sortingWorstTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="sortingAverageTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="sortingBestTime"
              onParamChange={handleParamChange}
              onParamFocusOut={handleParamFocusOut}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AlgorithmTimeComplexityDesigner;
