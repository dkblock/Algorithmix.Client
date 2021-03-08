import { createAsyncThunk } from "@reduxjs/toolkit";
import algorithmsService from "../../api/services/algorithms-service";

export const fetchAlgorithms = createAsyncThunk("fetchAlgorithms",
    async () => (
        await algorithmsService.fetchAlgorithms()
    ));