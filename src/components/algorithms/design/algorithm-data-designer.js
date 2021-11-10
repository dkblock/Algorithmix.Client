import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadAlgorithmDataTemplate,
  showClearAlgorithmDataModal,
  showUploadAlgorithmDataModal,
} from "../../../store/actions/algorithm";
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
          <Button
            className="w-100"
            color={colors.danger}
            startIcon={iconTypes.info}
            endIcon={iconTypes.delete}
            onClick={handleClearAlgorithmDescription}
          >
            Удалить описание
          </Button>
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
          <Button
            className="w-100"
            color={colors.danger}
            startIcon={iconTypes.constructor}
            endIcon={iconTypes.delete}
            onClick={handleClearAlgorithmConstructor}
          >
            Удалить Конструктор
          </Button>
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
