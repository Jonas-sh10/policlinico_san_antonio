import express from 'express';
import multer from 'multer';
import { createFile, getFiles, getFileById, updateFile, deleteFile } from '../controllers/FileController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Configurar almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // carpeta temporal para almacenar los archivos antes de subirlos a Cloudinary
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // renombrar archivo con un nombre único
    }
});

const upload = multer({ storage });

// Rutas
router.get("/", protect, getFiles);  // Obtener todos los archivos
router.get("/:id", protect, getFileById);  // Obtener un archivo por su ID
router.post("/", protect, upload.single('file'), createFile);  // Crear archivo y subir a Cloudinary
router.put("/:id", protect, updateFile);  // Actualizar archivo
router.delete("/:id", protect, deleteFile);  // Eliminar archivo

export default router;
