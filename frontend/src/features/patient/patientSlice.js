import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import patientService from "./patientService";

const patientInitialState = {
    patients: [],
    patient: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const createPatient = createAsyncThunk('patient/create', async (patientData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await patientService.createPatient(patientData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const getPatient = createAsyncThunk('patient/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await patientService.getPatient(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


export const getPatientByDni = createAsyncThunk('patient/getByDni', async (dni, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await patientService.getPatientByDni(dni, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const updatePatient = createAsyncThunk('patient/update', async ({id, patientData}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await patientService.updatePatient(id, patientData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deletePatient = createAsyncThunk('patient/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await patientService.deletePatient(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const patientSlice = createSlice({
    name: "patient",
    initialState: patientInitialState,
    reducers: {
        reset: (state) => patientInitialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createPatient.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createPatient.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.patients.push(action.payload);
        })
        .addCase(createPatient.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getPatient.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getPatient.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.patients = action.payload;
        })
        .addCase(getPatient.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getPatientByDni.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getPatientByDni.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.patient = action.payload;
        })
        .addCase(getPatientByDni.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updatePatient.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updatePatient.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.patient = action.payload;
        })
        .addCase(updatePatient.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deletePatient.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deletePatient.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.patients = state.patients.filter((patient) => patient._id !== action.payload.id);
        })
        .addCase(deletePatient.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

export const {reset} = patientSlice.actions;
export default patientSlice.reducer;

