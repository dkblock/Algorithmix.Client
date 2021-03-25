import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button, { colors, buttonTypes } from "../_common/Button";
import { hideModal } from "../../store/actions/modal";
import { IconButton, iconTypes } from "../_common/Icon";
import "./Modal.scss";

const CreateModal = ({ children, size, title }) => {
    const dispatch = useDispatch();
    const handleClose = () => dispatch(hideModal());

    return (
        <Dialog maxWidth={size} onClose={handleClose} fullWidth open>
            <DialogTitle className="modal-common__title" onClose={handleClose}>
                {title}
                <IconButton type={iconTypes.plus}/>
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
            <DialogActions>
                <Button type={buttonTypes.text} onClick={handleClose}>Отмена</Button>
                <Button color={colors.success}>Создать</Button>
            </DialogActions>
        </Dialog>
    )
};

export default CreateModal;