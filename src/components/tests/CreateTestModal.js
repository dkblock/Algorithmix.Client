import React from "react";
import { useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button, { colors, buttonTypes } from "../_common/Button";
import Dropdown from "../_common/Dropdown";
import TextField from "../_common/TextField";

const CreateTestModal = () => {
    const { tests, isFetching } = useSelector(state => state.tests);

    if (tests.length === 0)
        return null;

    return (
        <Dialog maxWidth="xs" fullWidth open>
            <DialogTitle>Создание нового теста</DialogTitle>
            <DialogContent dividers>
                <TextField className="w-100 mb-4" label="Название теста" error helperText="aaa"/>
                <Dropdown
                    className="w-100"
                    label="Алгоритм"
                    value={tests[0].algorithm.name}
                    items={tests.map((test) => test.algorithm.name)}
                    onChange={() => {
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button type={buttonTypes.text}>Отмена</Button>
                <Button color={colors.success}>Создать</Button>
            </DialogActions>
        </Dialog>
    )
};

export default CreateTestModal;