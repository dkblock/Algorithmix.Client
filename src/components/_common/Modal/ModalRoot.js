import React from "react";
import { useSelector } from "react-redux";
import CreateTestModal from "../../tests/view/CreateTestModal";
import DeleteTestModal from "../../tests/view/DeleteTestModal";
import DeleteTestQuestionModal from "../../tests/design/DeleteTestQuestionModal";
import LogoutModal from "../../_app/LogoutModal";
import UploadTestQuestionImageModal from "../../tests/design/UploadTestQuestionImageModal";
import modalTypes from "../../../constants/modal-types";

const modals = {
  [modalTypes.createTest]: CreateTestModal,
  [modalTypes.deleteTest]: DeleteTestModal,
  [modalTypes.deleteTestQuestion]: DeleteTestQuestionModal,
  [modalTypes.logout]: LogoutModal,
  [modalTypes.uploadTestQuestionImage]: UploadTestQuestionImageModal,
};

const ModalRoot = () => {
  const { modalType, modalProps } = useSelector((state) => state.modal);

  if (!modalType) return null;

  const SpecificModal = modals[modalType];
  return <SpecificModal {...modalProps} />;
};

export default ModalRoot;