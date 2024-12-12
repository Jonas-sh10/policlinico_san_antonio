import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import errorHandler from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";
import clinicHistoryRoutes from "./routes/clinicHistoryRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/patients", patientRoutes);
app.use("/api/v1/files", fileRoutes);  // Ruta para cargar archivos
app.use("/api/v1/visits", visitRoutes);
app.use("/api/v1/clinic_history", clinicHistoryRoutes);

// Errores
app.use(errorHandler);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`.yellow.bold); 
    });
});
