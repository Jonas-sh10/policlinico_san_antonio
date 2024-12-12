import mongoose from "mongoose";

const doctoSchema = mongoose.Schema({
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
    specialty: {
        type: [String],
        required: [true, "La especialidad es obligatoria"]
    },
    phone: {
        type: String,
        required: [true, "El telefono es obligatorio"]
    },
    email: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Doctor = mongoose.model("Doctor", doctoSchema);

export default Doctor;
