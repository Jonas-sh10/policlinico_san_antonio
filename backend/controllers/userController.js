import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../model/user/userModel.js";

const register = asyncHandler(async (req, res) => {
    const { dni, password, names, lastName, email } = req.body;
    // Validación de campos obligatorios
    const requiredFields = { 
        "DNI": dni, 
        "Contraseña": password, 
        "Nombre": names, 
        "Apellido": lastName, 
        "Email": email
    };
    for (const [field, value] of Object.entries(requiredFields)) {
        if (!value) {
            res.status(400);
            throw new Error(`El campo ${field} es obligatorio`);
        }
    }

    const userExists = await User.findOne({ dni });
    if (userExists) {
        res.status(400);
        throw new Error("El usuario ya existe");
    } else {
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hasPassword = await bcrypt.hash(password, salt);

        // Crear el usuario
        const user = await User.create({
            dni,
            password: hasPassword,
            names,
            lastName,
            email
        });

        // Si el usuario se ha creado
        if(user) {
            res.status(201).json({
                _id: user.id,
                dni: user.dni,
                names: user.name,
                lastName: user.lastName,
                email: user.email
            });
        }else{
            res.status(400);
            throw new Error("No se pudo crear el usuario");
        }
    }
});

const login = asyncHandler(async (req, res) => {
    const { dni, password } = req.body;

    // Validación de campos obligatorios
    const requiredFields = { 
        "DNI": dni, 
        "Contraseña": password
    };
    for (const [field, value] of Object.entries(requiredFields)) {
        if (!value) {
            res.status(400);
            throw new Error(`El campo ${field} es obligatorio`);
        }
    }

    const user = await User.findOne({ dni });

    if( user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            dni: user.dni,
            names: user.names,
            lastName: user.lastName,
            email: user.email,
            token: generarToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error("Credenciales incorrectas. Verifique su DNI y Contraseña");
    }
});

const generarToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    )
};

const data = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

export {
    register,
    login,
    data
};

