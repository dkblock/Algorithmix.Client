import React from "react";
import { useSelector } from "react-redux";
import ChangePasswordModal from "../../account/change-password-modal";
import ClearAlgorithmDataModal from "../../algorithms/design/clear-algorithm-data-modal";
import ConfirmEmailModal from "../../account/confirm-email-modal";
import CreateAlgorithmModal from "../../management/algorithms/create-algorithm-modal";
import CreateGroupModal from "../../management/groups/create-group-modal";
import CreateTestModal from "../../management/tests/create-test-modal";
import DeleteAlgorithmModal from "../../management/algorithms/delete-algorithm-modal"
import DeleteGroupModal from "../../management/groups/delete-group-modal";
import DeleteTestModal from "../../management/tests/delete-test-modal";
import DeleteUserTestResultModal from "../../management/user-test-results/delete-user-test-result-modal";
import DeleteTestQuestionModal from "../../tests/design/delete-test-question-modal";
import DeleteUserModal from "../../management/users/delete-user-modal";
import LogoutModal from "../../_app/logout-modal";
import PasswordChangedModal from "../../account/password-changed-modal";
import PublishTestModal from "../../tests/design/publish-test-modal";
import UploadAlgorithmDataModal from "../../algorithms/design/upload-algorithm-data-modal";
import UploadAlgorithmImageModal from "../../algorithms/design/upload-algorithm-image-modal";
import UploadTestQuestionImageModal from "../../tests/design/test-question-designer/upload-test-question-image-modal";
import { ZoomImageModal } from "../zoom-image";
import modalTypes from "../../../constants/modal-types";

const modals = {
  [modalTypes.changePassword]: ChangePasswordModal,
  [modalTypes.clearAlgorithmData]: ClearAlgorithmDataModal,
  [modalTypes.confirmEmail]: ConfirmEmailModal,
  [modalTypes.createAlgorithm]: CreateAlgorithmModal,
  [modalTypes.createGroup]: CreateGroupModal,
  [modalTypes.createTest]: CreateTestModal,
  [modalTypes.deleteAlgorithm]: DeleteAlgorithmModal,
  [modalTypes.deleteGroup]: DeleteGroupModal,
  [modalTypes.deleteTest]: DeleteTestModal,
  [modalTypes.deleteUserTestResult]: DeleteUserTestResultModal,
  [modalTypes.deleteTestQuestion]: DeleteTestQuestionModal,
  [modalTypes.deleteUser]: DeleteUserModal,
  [modalTypes.logout]: LogoutModal,
  [modalTypes.passwordChanged]: PasswordChangedModal,
  [modalTypes.publishTest]: PublishTestModal,
  [modalTypes.uploadAlgorithmData]: UploadAlgorithmDataModal,
  [modalTypes.uploadAlgorithmImage]: UploadAlgorithmImageModal,
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
