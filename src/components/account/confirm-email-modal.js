import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmEmailRequest } from "../../store/actions/account";
import { hideModal } from "../../store/actions/modal";
import { InfoModal } from "../_common/modal";

const ConfirmEmailModal = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.modal.modalProps);

  useEffect(() => {
    dispatch(confirmEmailRequest());
  }, [dispatch]);

  const handleSubmit = () => dispatch(hideModal());

  const text = (
    <div>
      На Ваш электронный адрес ({email}) было отправлено сообщение, содержащее ссылку для подтверждения e-mail адреса.
      Если Вы не обнаружите письмо, проверьте папку "Спам" - возможно, оно попало туда по ошибке.
    </div>
  );

  return <InfoModal title="Подтверждение e-mail" infoText={text} onSubmit={handleSubmit} />;
};

export default ConfirmEmailModal;
