import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import clinicHistoryReducer from "../features/clinic_history/clinicHistorySlice";
import doctorReducer from "../features/doctor/doctorSlice";
import visitReducer from "../features/visit/visitSlice"; // Importa el nuevo reducer

export const store = configureStore({
    reducer: {
        auth: authReducer,
        clinicHistory: clinicHistoryReducer,
        doctor: doctorReducer,
        visit: visitReducer, // Añade el reducer de visit
    },
});
