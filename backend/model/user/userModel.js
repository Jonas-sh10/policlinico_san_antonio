import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    dni: {
        type: String,
        required: [true, "El DNI es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    names: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    lastName: {
        type: String,
        required: [true, "El apellido es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El correo es obligatorio"]
    },
    rol: {
        type: String,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'ADMIN_ROLE',
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;
