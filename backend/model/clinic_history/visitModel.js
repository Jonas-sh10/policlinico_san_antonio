import mongoose from "mongoose";

const visitSchema = mongoose.Schema({
    speciality: {
        type: String,
        required: [true, "La especialidad es obligatoria"]
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: [true, "El doctor es obligatorio"]
    }
},{
    timestamps: true
});

const Visit = mongoose.model("Visit", visitSchema);

export default Visit;
