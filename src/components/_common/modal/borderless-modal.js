import React from "react";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import { hideModal } from "../../../store/actions/modal";
import { modalSizes } from "./index";

const BorderlessModal = ({ children }) => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(hideModal());

  return (
    <Dialog maxWidth={modalSizes.large} onClose={handleClose} open>
      <div onClick={handleClose}>{children}</div>
    </Dialog>
  );
};

export default BorderlessModal;
