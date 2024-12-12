import mongoose from "mongoose";

const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    lastName: {
        type: String,
        required: [true, "El apellido es obligatorio"]
    },
    dni: {
        type: String,
        required: [true, "El dni es obligatorio"],
        unique: true
    },
    birthdate: {
        type: Date,
        required: [true, "La fecha de nacimiento es obligatoria"]
    },
    age: {
        type: Number,
        required:  [true, "La edad es obligatoria"]
    },
    gender: {
        type: String,
        required: [true, "El genero es obligatorio"]
    },
    address: {
        type: String
    },
    phone: {
        type: String,
        required: [true, "El telefono es obligatorio"]
    },
    email: {
        type: String
    },
}, {
    timestamps: true
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
