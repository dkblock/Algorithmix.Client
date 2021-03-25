import { createAction } from "@reduxjs/toolkit";

export const showModal = createAction("showModal", (modalType) => ({ payload: { modalType } }));
export const hideModal = createAction("hideModal");