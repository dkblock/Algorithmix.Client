import React from "react";
import { useDispatch } from "react-redux";
import { hideModal } from "../../store/actions/modal";
import { InfoModal, modalSizes } from "../_common/modal";

const PasswordChangedModal = () => {
  const dispatch = useDispatch();
  return (
    <InfoModal
      size={modalSizes.small}
      title="Пароль изменён"
      infoText="Ваш пароль был успешно изменён!"
      onSubmit={() => dispatch(hideModal())}
    />
  );
};

export default PasswordChangedModal;
