import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { updateAlgorithmTimeComplexity } from "../../../store/actions/algorithm";
import TextField from "../../_common/text-field";
import Tooltip from "../../_common/tooltip";
import { Icon, iconTypes } from "../../_common/icon";

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
            <th colSpan={2}>
              <div className="algorithm-time-complexity-designer__table-header">
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
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="searchingWorstTime"
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
          </tr>
          <tr>
            <td>Удаление</td>
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="deletionWorstTime"
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
          </tr>
          <tr>
            <td>Поиск максимума</td>
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="findMaxElementWorstTime"
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
          </tr>
          <tr>
            <td>Сортировка</td>
            <SpecificTextField
              timeComplexity={timeComplexity}
              param="sortingWorstTime"
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
