import mongoose from "mongoose";

const clinicHistorySchema = mongoose.Schema({
    patients: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: [true, "El paciente es obligatorio"]
    },
    visits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Visit",
        required: [true, "Las visitas son obligatorias"]
    }]
}, {
    timestamps: true
});

const ClinicHistory = mongoose.model("ClinicHistory", clinicHistorySchema);

export default ClinicHistory;
