import React from "react";
import { useSelector } from "react-redux";
import CreateGroupModal from "../../management/groups/CreateGroupModal";
import CreateTestModal from "../../management/tests/CreateTestModal";
import DeleteGroupModal from "../../management/groups/DeleteGroupModal";
import DeleteTestModal from "../../management/tests/DeleteTestModal";
import DeleteUserTestResultModal from "../../management/user-test-results/DeleteUserTestResultModal";
import DeleteTestQuestionModal from "../../tests/design/DeleteTestQuestionModal";
import DeleteUserModal from "../../management/users/DeleteUserModal";
import LogoutModal from "../../_app/LogoutModal";
import PublishTestModal from "../../tests/design/PublishTestModal";
import UploadTestQuestionImageModal from "../../tests/design/test-question/UploadTestQuestionImageModal";
import { ZoomImageModal } from "../ZoomImage";
import modalTypes from "../../../constants/modal-types";

const modals = {
  [modalTypes.createGroup]: CreateGroupModal,
  [modalTypes.createTest]: CreateTestModal,
  [modalTypes.deleteGroup]: DeleteGroupModal,
  [modalTypes.deleteTest]: DeleteTestModal,
  [modalTypes.deleteUserTestResult]: DeleteUserTestResultModal,
  [modalTypes.deleteTestQuestion]: DeleteTestQuestionModal,
  [modalTypes.deleteUser]: DeleteUserModal,
  [modalTypes.logout]: LogoutModal,
  [modalTypes.publishTest]: PublishTestModal,
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
