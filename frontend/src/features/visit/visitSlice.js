import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import visitService from './visitService';

const visitInitialState = {
    visits: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createVisit = createAsyncThunk('visit/create', async (visitData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await visitService.createVisit(visitData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const getVisit = createAsyncThunk('visit/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await visitService.getVisit(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


export const getVisitById = createAsyncThunk('visit/getById', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await visitService.getVisitById(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateVisit = createAsyncThunk('visit/update', async ({id, visitData}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await visitService.updateVisit(id, visitData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteVisit = createAsyncThunk('visit/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await visitService.deleteVisit(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const visitSlice = createSlice({
    name: 'visit',
    initialState: visitInitialState,
    reducers: {
        reset: (state) => visitInitialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createVisit.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createVisit.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.visits.push(action.payload);
        })
        .addCase(createVisit.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getVisit.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getVisit.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.visits = action.payload;
        })
        .addCase(getVisit.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getVisitById.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getVisitById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.visits = action.payload;
        })
        .addCase(getVisitById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateVisit.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateVisit.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.visits = state.visits.map((visit) => visit._id === action.payload._id ? action.payload : visit);
        })
        .addCase(updateVisit.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteVisit.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteVisit.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.visits = state.visits.filter((visit) => visit._id !== action.payload.id);
        })
        .addCase(deleteVisit.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

export const { reset } = visitSlice.actions;
export default visitSlice.reducer;
