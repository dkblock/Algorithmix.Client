import React from "react";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";

import Button, { buttonTypes } from "../button";
import { IconButton, iconTypes } from "../icon";
import { hideModal } from "../../../store/actions/modal";
import modalSizes from "../../../constants/modal-sizes";
import "./modal.scss";

const InfoModal = ({ infoText, okButtonText = "Ок", size = modalSizes.small, title, onSubmit }) => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(hideModal());

  return (
    <Dialog maxWidth={size} onClose={handleClose} fullWidth open>
      <DialogTitle className="modal-common__header">
        <span className="modal-common__title">{title}</span>
        <IconButton type={iconTypes.close} onClick={handleClose} />
      </DialogTitle>
      <DialogContent className="modal-common__content" dividers>
        <Typography>{infoText}</Typography>
      </DialogContent>
      <DialogActions>
        <Button type={buttonTypes.text} onClick={handleClose}>
          Отмена
        </Button>
        <Button onClick={onSubmit}>{okButtonText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoModal;
