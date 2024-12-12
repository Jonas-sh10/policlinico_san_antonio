import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clinicHistoryService from "./clinicHistoryService";

const clinicHistoryInitialState = {
    clinicHistory: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const createClinicHistory = createAsyncThunk('clinicHistory/create', async (clinicHistoryData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await clinicHistoryService.createClinicHistory(clinicHistoryData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const getClinicHistory = createAsyncThunk('clinicHistory/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await clinicHistoryService.getClinicHistory(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const getClinicHistoryByDni = createAsyncThunk('clinicHistory/getByDni', async (dni, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await clinicHistoryService.getClinicHistoryByDni(dni, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const getClinicHistoryByDate = createAsyncThunk('clinicHistory/getByDate', async ({startDate, endDate}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await clinicHistoryService.getClinicHistoryByDate({startDate, endDate}, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateClinicHistory = createAsyncThunk('clinicHistory/update', async ({id, clinicHistoryData}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await clinicHistoryService.updateClinicHistory(id, clinicHistoryData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteClinicHistory = createAsyncThunk('clinicHistory/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await clinicHistoryService.deleteClinicHistory(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const clinicHistorySlice = createSlice({
    name: 'clinicHistory',
    initialState: clinicHistoryInitialState,
    reducers: {
        reset: (state) => clinicHistoryInitialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createClinicHistory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createClinicHistory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.clinicHistory.push(action.payload);
        })
        .addCase(createClinicHistory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getClinicHistory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getClinicHistory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.clinicHistory = action.payload;
        })
        .addCase(getClinicHistory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getClinicHistoryByDni.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getClinicHistoryByDni.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.clinicHistory = action.payload;
        })
        .addCase(getClinicHistoryByDni.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getClinicHistoryByDate.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getClinicHistoryByDate.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.clinicHistory = action.payload;
        })
        .addCase(getClinicHistoryByDate.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateClinicHistory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateClinicHistory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.clinicHistory = state.clinicHistory.map((clinicHistory) => clinicHistory._id === action.payload._id ? action.payload : clinicHistory);
        })
        .addCase(updateClinicHistory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteClinicHistory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteClinicHistory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.clinicHistory = state.clinicHistory.filter((clinicHistory) => clinicHistory._id !== action.payload);
        })
        .addCase(deleteClinicHistory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
});

export const { reset } = clinicHistorySlice.actions;

export default clinicHistorySlice.reducer;
