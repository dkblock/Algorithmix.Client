import React from "react";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";

import Button, { colors, buttonTypes } from "../button";
import { IconButton, iconTypes } from "../icon";
import { hideModal } from "../../../store/actions/modal";
import modalSizes from "../../../constants/modal-sizes";
import "./modal.scss";

const DeleteModal = ({
  deleteText,
  deleteButtonText = "Удалить",
  size = modalSizes.small,
  title,
  isDeleting,
  actions,
  onDelete,
}) => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(hideModal());

  return (
    <Dialog maxWidth={size} onClose={handleClose} fullWidth open>
      <DialogTitle className="modal-common__header">
        <span className="modal-common__title">{title}</span>
        <IconButton type={iconTypes.close} onClick={handleClose} />
      </DialogTitle>
      <DialogContent className="modal-common__content" dividers>
        <Typography>{deleteText}</Typography>
      </DialogContent>
      <DialogActions>
        <div className="modal-common__actions">
          {!!actions && actions}
          <div className="modal-common__actions-buttons">
            <Button type={buttonTypes.text} onClick={handleClose}>
              Отмена
            </Button>
            <Button color={colors.danger} isLoading={isDeleting} onClick={onDelete}>
              {deleteButtonText}
            </Button>
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
