import React from "react";
import { useSelector } from "react-redux";
import CreateTestModal from "./tests/CreateTestModal";
import modalTypes from "../constants/modal-types";

const modals = {
    [modalTypes.createTest]: CreateTestModal
};

const ModalRoot = () => {
    const { modalType } = useSelector(state => state.modal);

    if (!modalType)
        return null;

    const SpecificModal = modals[modalType];
    return <SpecificModal/>;
};

export default ModalRoot;