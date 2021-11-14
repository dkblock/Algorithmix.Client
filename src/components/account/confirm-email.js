import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQueryParams, useTitle } from "../../hooks";
import { confirmEmail } from "../../store/actions/account";

const ConfirmEmail = () => {
  const dispatch = useDispatch();
  const { userId, code } = useQueryParams();

  useTitle("Подтверждение e-mail", "Algorithmix");

  useEffect(() => {
    if (userId && code) {
      const credentials = { userId, code };
      dispatch(confirmEmail({ credentials }));
    }
  }, [userId, code]);

  return null;
};

export default ConfirmEmail;
