import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

// Configurar Multer para usar almacenamiento en memoria
const storage = multer.memoryStorage();

// Usar multer para procesar la carga de archivos
const upload = multer({ storage: storage });

// Función para cargar archivos a Cloudinary
const uploadToCloudinary = async (file) => {
  try {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" }, // Esto sube cualquier tipo de archivo
      (error, result) => {
        if (error) {
          throw new Error(error);
        }
        return result;
      }
    );

    // Convertimos el archivo en un stream para Cloudinary
    const readableFile = new Readable();
    readableFile._read = () => {}; // Hace que el stream sea legible
    readableFile.push(file.buffer);
    readableFile.push(null);
    
    // Subimos el archivo al stream de Cloudinary
    readableFile.pipe(stream);
  } catch (err) {
    console.log("Error subiendo el archivo:", err);
    throw new Error("Error subiendo el archivo a Cloudinary.");
  }
};

export { upload, uploadToCloudinary };
