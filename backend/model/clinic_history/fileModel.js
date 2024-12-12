import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
    typeFile: {
        type: String,
        required: [true, "El tipo de archivo es obligatorio"]
    },
    url: {
        type: String,
        required: [true, "La url es obligatoria"]
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

const File = mongoose.model("File", fileSchema);

export default File;