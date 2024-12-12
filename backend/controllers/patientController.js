import asyncHandler from "express-async-handler";
import Patient from "../model/clinic_history/patientModel.js";

const getPatients = asyncHandler(async (req, res) => {
    const patients = await Patient.find();
    res.status(200).json(patients);
});

const getPatientByDni = asyncHandler(async (req, res) => {
    const patient = await Patient.findOne({ dni: req.params.dni });
    if (!patient) {
        res.status(400);
        throw new Error("El paciente no existe");
    }
    res.status(200).json(patient);
});

const createPatient = asyncHandler(async (req, res) => {
    const { name, lastName, dni, birthdate, age, gender, phone } = req.body;

    // Validación de campos obligatorios
    const requiredFields = { 
        "Nombre": name, 
        "Apellido": lastName, 
        "DNI": dni, 
        "Fecha de Nacimiento": birthdate, 
        "Edad": age, 
        "Género": gender, 
        "Teléfono": phone 
    };
    for (const [field, value] of Object.entries(requiredFields)) {
        if (!value) {
            res.status(400);
            throw new Error(`El campo'${field}' es obligatorio.`);
        }
    }

    const patientExists = await Patient.findOne({ dni });
    if (patientExists) {
        res.status(400);
        throw new Error("El paciente ya existe");
    } else {
        const patient = await Patient.create({ ...req.body });
        res.status(201).json(patient);
    }
});

const updatePatient = asyncHandler(async (req, res) => {
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //     res.status(400);
    //     throw new Error("ID inválido. No es un ObjectId válido.");
    // } else {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
        res.status(400);
        throw new Error("El paciente no existe");
    }

    const patientUpdated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(patientUpdated);
    // }
});

const deletePatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
        res.status(404);
        throw new Error("El paciente no existe");
    }

    await patient.deleteOne();
    res.status(200).json({ id: req.params.id });
});


export {
    getPatients,
    getPatientByDni,
    createPatient,
    updatePatient,
    deletePatient
};
