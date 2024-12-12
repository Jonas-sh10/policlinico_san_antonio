import asyncHandler from "express-async-handler";
import cloudinary from "cloudinary";
import File from "../model/clinic_history/fileModel.js";

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Obtener todos los archivos
const getFiles = asyncHandler(async (req, res) => {
    const files = await File.find();  // Recuperamos todos los archivos
    res.status(200).json(files);  // Retornamos todos los archivos con sus URLs
});

// Obtener un archivo por su ID
const getFileById = asyncHandler(async (req, res) => {
    const file = await File.findById(req.params.id);
    if (!file) {
        res.status(400);
        throw new Error("El archivo adjunto no existe");
    }
    res.status(200).json(file);
});

// Crear archivo y subirlo a Cloudinary
const createFile = asyncHandler(async (req, res) => {
    const { typeFile, description } = req.body;
    let fileUrl;

    // Validación de campos obligatorios
    const requiredFields = {
        "Tipo De Archivo": typeFile,
        "Descripción": description,
    };
    for (const [field, value] of Object.entries(requiredFields)) {
        if (!value) {
            res.status(400);
            throw new Error(`El campo '${field}' es obligatorio`);
        }
    }

    // Verificar si se proporciona un archivo
    if (req.files && req.files.file) {
        try {
            // Subir archivo a Cloudinary
            const result = await cloudinary.v2.uploader.upload(req.files.file.tempFilePath, {
                folder: 'policlinico_files', // Puedes personalizar la carpeta
                resource_type: 'auto', // Detecta automáticamente el tipo de archivo
            });

            // Obtener la URL segura del archivo subido
            fileUrl = result.secure_url;
        } catch (error) {
            res.status(500);
            throw new Error("Error al subir el archivo a Cloudinary");
        }
    } else {
        res.status(400);
        throw new Error("No se ha proporcionado ningún archivo");
    }

    // Crear un nuevo registro de archivo en la base de datos con la URL del archivo
    const file = await File.create({
        typeFile,
        url: fileUrl,
        description,
    });

    res.status(201).json(file);  // Retornar el archivo con su URL
});

// Actualizar archivo
const updateFile = asyncHandler(async (req, res) => {
    const file = await File.findById(req.params.id);
    if (!file) {
        res.status(400);
        throw new Error("El archivo adjunto no existe");
    }
    const fileUpdated = await File.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(fileUpdated);
});

// Eliminar archivo
const deleteFile = asyncHandler(async (req, res) => {
    const file = await File.findById(req.params.id);
    if (!file) {
        res.status(400);
        throw new Error("El archivo adjunto no existe");
    }
    await File.deleteOne({ _id: req.params.id });
    res.status(200).json({ id: req.params.id });
});

export {
    getFiles,
    getFileById,
    createFile,
    updateFile,
    deleteFile,
};
