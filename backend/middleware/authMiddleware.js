import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/user/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith
        ('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Permiso denegado. Por favor, inicie sesión para acceder.");
        }
    } else {
        res.status(401);
        throw new Error("Acceso no autorizado. Se requiere autenticación.");
    }
});

export default protect;
