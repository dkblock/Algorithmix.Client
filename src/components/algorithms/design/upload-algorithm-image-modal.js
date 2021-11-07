import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateModal } from "../../_common/modal";
import FileDropzone, { fileTypes } from "../../_common/file-dropzone";
import { uploadAlgorithmImage } from "../../../store/actions/algorithm";

const UploadAlgorithmImageModal = () => {
  const dispatch = useDispatch();
  const { algorithmId } = useSelector((state) => state.modal.modalProps);
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
    <CreateModal title="Загрузка изображения" createButtonText="Загрузить" onCreate={handleAlgorithmImageUpload}>
      <FileDropzone acceptedFileTypes={[fileTypes.image]} onDrop={handleAlgorithmImageDrop} />
    </CreateModal>
  );
};

export default UploadAlgorithmImageModal;
