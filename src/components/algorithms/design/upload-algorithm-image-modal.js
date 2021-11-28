import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateModal } from "../../_common/modal";
import FileDropzone, { fileTypes } from "../../_common/file-dropzone";
import { uploadAlgorithmImage } from "../../../store/actions/algorithm";

const UploadAlgorithmImageModal = () => {
  const dispatch = useDispatch();
  const { algorithmId } = useSelector((state) => state.modal.modalProps);
  const { isSaving } = useSelector((state) => state.algorithmDesign);
  const [image, setImage] = useState(null);

  const handleAlgorithmImageDrop = (images) => {
    if (images.length > 0) setImage(images[0]);
    else setImage(null);
  };

  const handleAlgorithmImageUpload = () => {
    if (image) {
      dispatch(uploadAlgorithmImage({ algorithmId, image }));
    }
  };

  return (
    <CreateModal
      title="Загрузка изображения"
      createButtonText="Загрузить"
      isCreating={isSaving}
      onCreate={handleAlgorithmImageUpload}
    >
      <FileDropzone acceptedFileTypes={[fileTypes.image]} onDrop={handleAlgorithmImageDrop} />
      <div>Рекомендуемый размер изображения: 600x400</div>
    </CreateModal>
  );
};

export default UploadAlgorithmImageModal;
