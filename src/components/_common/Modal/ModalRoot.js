import React from "react";
import { useSelector } from "react-redux";
import CreateGroupModal from "../../management/groups/CreateGroupModal";
import CreateTestModal from "../../management/tests/CreateTestModal";
import DeleteGroupModal from "../../management/groups/DeleteGroupModal";
import DeleteTestModal from "../../management/tests/DeleteTestModal";
import DeleteTestResultModal from "../../management/test-results/DeleteTestResultModal";
import DeleteTestQuestionModal from "../../tests/design/DeleteTestQuestionModal";
import DeleteUserModal from "../../management/users/DeleteUserModal";
import LogoutModal from "../../_app/LogoutModal";
import UploadTestQuestionImageModal from "../../tests/design/test-question/UploadTestQuestionImageModal";
import { ZoomImageModal } from "../ZoomImage";
import modalTypes from "../../../constants/modal-types";

const modals = {
  [modalTypes.createGroup]: CreateGroupModal,
  [modalTypes.createTest]: CreateTestModal,
  [modalTypes.deleteGroup]: DeleteGroupModal,
  [modalTypes.deleteTest]: DeleteTestModal,
  [modalTypes.deleteTestResult]: DeleteTestResultModal,
  [modalTypes.deleteTestQuestion]: DeleteTestQuestionModal,
  [modalTypes.deleteUser]: DeleteUserModal,
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
