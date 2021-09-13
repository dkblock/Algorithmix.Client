import React from "react";
import { useSelector } from "react-redux";
import { BorderlessModal } from "../modal";

const ZoomImageModal = () => {
  const { src, alt } = useSelector((state) => state.modal.modalProps);

  return (
    <BorderlessModal>
      <img className="zoom-image w-100" src={src} alt={alt} />
    </BorderlessModal>
  );
};

export default ZoomImageModal;
