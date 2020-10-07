import { createAsyncThunk } from "@reduxjs/toolkit";
import algorithmsService from "../../api/services/algorithmsService";

export const fetchAlgorithms = createAsyncThunk("fetchAlgorithms",
    async () => (
        await algorithmsService.fetchAlgorithms()
    ));