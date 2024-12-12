import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import doctorService from "./doctorService";

const doctorInitialState = {
    doctors: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const createDoctor = createAsyncThunk('doctor/create', async (doctorData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await doctorService.createDoctor(doctorData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const getDoctor = createAsyncThunk('doctor/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await doctorService.getDoctor(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


export const getDoctorByDni = createAsyncThunk('doctor/getByDni', async (dni, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await doctorService.getDoctorByDni(dni, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const getDoctorBySpecialty = createAsyncThunk('doctor/getBySpecialty', async (specialty, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await doctorService.getDoctorBySpecialty(specialty, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateDoctor = createAsyncThunk('doctor/update', async ({dni, doctorData}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await doctorService.updateDoctor(dni, doctorData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteDoctor = createAsyncThunk('doctor/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await doctorService.deleteDoctor(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


export const doctorSlice = createSlice({
    name: 'doctor',
    initialState: doctorInitialState,
    reducers: {
        reset: (state) => doctorInitialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDoctor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.doctors.push(action.payload);
            })
            .addCase(createDoctor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getDoctor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.doctors = action.payload;
            })
            .addCase(getDoctor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getDoctorByDni.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDoctorByDni.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.doctors = action.payload;
            })
            .addCase(getDoctorByDni.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getDoctorBySpecialty.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDoctorBySpecialty.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.doctors = action.payload;
            })
            .addCase(getDoctorBySpecialty.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateDoctor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.doctors = state.doctors.map((doctor) => doctor._id === action.payload.id ? action.payload : doctor);
            })
            .addCase(updateDoctor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteDoctor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.doctors = state.doctors.filter((doctor) => doctor._id !== action.payload.id);
            })
            .addCase(deleteDoctor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { reset } = doctorSlice.actions;

export default doctorSlice.reducer;

