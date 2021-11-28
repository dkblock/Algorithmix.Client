import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadAlgorithmConstructor,
  downloadAlgorithmDataTemplate,
  downloadAlgorithmDescription,
  showClearAlgorithmDataModal,
  showUploadAlgorithmDataModal,
} from "../../../store/actions/algorithm";
import { navigateToAlgorithmConstructor, navigateToAlgorithmDescription } from "../../../utils/navigator";
import algorithmDataTypes from "../../../constants/algorithm-data-types";
import Button, { colors } from "../../_common/button";
import { iconTypes } from "../../_common/icon";

const AlgorithmDataDesigner = () => {
  const dispatch = useDispatch();
  const { algorithm } = useSelector((state) => state.algorithmDesign);

  const handleUploadAlgorithmDescription = useCallback(
    () =>
      dispatch(
        showUploadAlgorithmDataModal({
          algorithmId: algorithm.id,
          algorithmDataType: algorithmDataTypes.description,
        })
      ),
    [dispatch]
  );

  const handleClearAlgorithmDescription = useCallback(
    () =>
      dispatch(
        showClearAlgorithmDataModal({
          algorithmId: algorithm.id,
          algorithmDataType: algorithmDataTypes.description,
        })
      ),
    [dispatch]
  );

  const handleDownloadAlgorithmDescription = useCallback(
    () => dispatch(downloadAlgorithmDescription({ algorithmId: algorithm.id })),
    [dispatch]
  );

  const handleUploadAlgorithmConstructor = useCallback(
    () =>
      dispatch(
        showUploadAlgorithmDataModal({
          algorithmId: algorithm.id,
          algorithmDataType: algorithmDataTypes.constructor,
        })
      ),
    [dispatch]
  );

  const handleClearAlgorithmConstructor = useCallback(
    () =>
      dispatch(
        showClearAlgorithmDataModal({
          algorithmId: algorithm.id,
          algorithmDataType: algorithmDataTypes.constructor,
        })
      ),
    [dispatch]
  );

  const handleDownloadAlgorithmConstructor = useCallback(
    () => dispatch(downloadAlgorithmConstructor({ algorithmId: algorithm.id })),
    [dispatch]
  );

  const handleDownloadAlgorithmDataTemplate = useCallback(
    () => dispatch(downloadAlgorithmDataTemplate({ algorithmId: algorithm.id })),
    [dispatch]
  );

  return (
    <div className="algorithm-data-designer">
      <div className="algorithm-data-designer__section">
        <Button
          className="w-100"
          color={colors.success}
          startIcon={iconTypes.info}
          endIcon={iconTypes.upload}
          onClick={handleUploadAlgorithmDescription}
        >
          Загрузить описание
        </Button>
        {algorithm.hasDescription && (
          <>
            <Button
              className="w-100"
              color={colors.primary}
              startIcon={iconTypes.info}
              endIcon={iconTypes.download}
              onClick={handleDownloadAlgorithmDescription}
            >
              Скачать описание
            </Button>
            <Button
              className="w-100"
              color={colors.danger}
              startIcon={iconTypes.info}
              endIcon={iconTypes.delete}
              onClick={handleClearAlgorithmDescription}
            >
              Удалить описание
            </Button>
            <Button
              className="w-100"
              color={colors.primary}
              type="outlined"
              startIcon={iconTypes.info}
              endIcon={iconTypes.launch}
              onClick={() => navigateToAlgorithmDescription(algorithm.id)}
            >
              Открыть описание
            </Button>
          </>
        )}
      </div>
      <div className="algorithm-data-designer__section">
        <Button
          className="w-100"
          color={colors.success}
          startIcon={iconTypes.constructor}
          endIcon={iconTypes.upload}
          onClick={handleUploadAlgorithmConstructor}
        >
          Загрузить Конструктор
        </Button>
        {algorithm.hasConstructor && (
          <>
            <Button
              className="w-100"
              color={colors.primary}
              startIcon={iconTypes.constructor}
              endIcon={iconTypes.download}
              onClick={handleDownloadAlgorithmConstructor}
            >
              Скачать Конструктор
            </Button>
            <Button
              className="w-100"
              color={colors.danger}
              startIcon={iconTypes.constructor}
              endIcon={iconTypes.delete}
              onClick={handleClearAlgorithmConstructor}
            >
              Удалить Конструктор
            </Button>
            <Button
              className="w-100"
              color={colors.primary}
              type="outlined"
              startIcon={iconTypes.constructor}
              endIcon={iconTypes.launch}
              onClick={() => navigateToAlgorithmConstructor(algorithm.id)}
            >
              Открыть Конструктор
            </Button>
          </>
        )}
      </div>
      <div className="algorithm-data-designer__section">
        <Button
          className="w-100"
          color={colors.primary}
          endIcon={iconTypes.download}
          onClick={handleDownloadAlgorithmDataTemplate}
        >
          Скачать шаблон
        </Button>
      </div>
    </div>
  );
};

export default AlgorithmDataDesigner;
