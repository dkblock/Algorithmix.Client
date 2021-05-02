import React from "react";
import { useSelector } from "react-redux";
import CreateTestModal from "../../management/tests/CreateTestModal";
import DeleteTestModal from "../../management/tests/DeleteTestModal";
import DeleteTestQuestionModal from "../../tests/design/DeleteTestQuestionModal";
import LogoutModal from "../../_app/LogoutModal";
import UploadTestQuestionImageModal from "../../tests/design/UploadTestQuestionImageModal";
import { ZoomImageModal } from "../ZoomImage";
import modalTypes from "../../../constants/modal-types";

const modals = {
  [modalTypes.createTest]: CreateTestModal,
  [modalTypes.deleteTest]: DeleteTestModal,
  [modalTypes.deleteTestQuestion]: DeleteTestQuestionModal,
  [modalTypes.logout]: LogoutModal,
  [modalTypes.uploadTestQuestionImage]: UploadTestQuestionImageModal,
  [modalTypes.zoomImage]: ZoomImageModal,
};

const ModalRoot = () => {
  const { modalType, modalProps } = useSelector((state) => state.modal);

  if (!modalType) return null;

  const SpecificModal = modals[modalType];
  return <SpecificModal {...modalProps} />;
};

export default ModalRoot;
