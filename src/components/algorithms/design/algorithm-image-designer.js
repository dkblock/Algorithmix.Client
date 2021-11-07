import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAlgorithmImage, showUploadAlgorithmImageModal } from "../../../store/actions/algorithm";
import { getFileSrc } from "../../../utils/get-file-src";
import images from "../../../constants/images";
import ZoomImage from "../../_common/zoom-image";
import Button, { colors } from "../../_common/button";
import { iconTypes } from "../../_common/icon";

const AlgorithmImageDesigner = () => {
  const dispatch = useDispatch();
  const { algorithm } = useSelector((state) => state.algorithmDesign);

  const handleUploadAlgorithmImage = useCallback(
    () => dispatch(showUploadAlgorithmImageModal({ algorithmId: algorithm.id })),
    [dispatch]
  );

  const handleClearAlgorithmImage = useCallback(() => dispatch(clearAlgorithmImage({ algorithmId: algorithm.id })), [
    dispatch,
  ]);

  return (
    <div className="algorithm-image-designer">
      <ZoomImage
        className="algorithm-image-designer__image"
        src={getFileSrc(algorithm.imageUrl)}
        alt="algorithm image"
      />
      <Button className="w-100" color={colors.success} endIcon={iconTypes.upload} onClick={handleUploadAlgorithmImage}>
        Загрузить новое изображение
      </Button>
      {algorithm.imageUrl !== images.algorithms.default && (
        <Button className="w-100" color={colors.danger} endIcon={iconTypes.delete} onClick={handleClearAlgorithmImage}>
          Удалить изображение
        </Button>
      )}
    </div>
  );
};

export default AlgorithmImageDesigner;
