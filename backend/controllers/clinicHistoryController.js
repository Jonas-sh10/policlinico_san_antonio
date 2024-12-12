import asyncHandler from "express-async-handler";
import ClinicHistory from "../model/clinic_history/clinicHistoryModel.js";
import Patient from "../model/clinic_history/patientModel.js";
import Visit from "../model/clinic_history/visitModel.js";

// Obtener toda la historia clínica
const getClinicHistory = asyncHandler(async (req, res) => {
    const clinicHistory = await ClinicHistory.find()
        .populate('patients')   // Incluir datos del paciente
        .populate('visits');    // Incluir datos de las visitas
    res.status(200).json(clinicHistory);
});

// Obtener historia clínica por DNI del paciente
const getClinicHistoryByDni = asyncHandler(async (req, res) => {
    // Buscar paciente por DNI
    const patient = await Patient.findOne({ dni: req.params.dni });
    if (!patient) {
        res.status(400);
        throw new Error("El paciente no existe");
    }

    // Buscar la historia clínica asociada al paciente
    const clinicHistory = await ClinicHistory.findOne({ patients: patient._id })
        .populate('patients')   // Incluir datos del paciente
        .populate({
            path: 'visits',
            populate: [
                {
                    path: 'doctor',     // Incluir información del doctor
                    model: 'Doctor'
                },
                {
                    path: 'files',      // Suponiendo que 'files' es un campo de las visitas
                    model: 'File'       // Modelo que almacena los archivos
                }
            ]
        });    // Incluir datos de las visitas

    if (!clinicHistory) {
        res.status(400);
        throw new Error("La historia clínica no existe para este paciente");
    }

    res.status(200).json([clinicHistory]);
});

const getClinicHistoryByDate = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;

    // Crear fechas UTC para el inicio y el final
    const start = new Date(Date.UTC(
        new Date(startDate).getUTCFullYear(),
        new Date(startDate).getUTCMonth(),
        new Date(startDate).getUTCDate(),
        0, 0, 0, 0  // Medianoche del día de inicio en UTC
    ));

    const end = new Date(Date.UTC(
        new Date(endDate).getUTCFullYear(),
        new Date(endDate).getUTCMonth(),
        new Date(endDate).getUTCDate(),
        23, 59, 59, 999  // Última milésima de segundo del día de final en UTC
    ));

    const clinicHistory = await ClinicHistory.find({
        createdAt: {
            $gte: start,
            $lte: end
        }
    })
        .populate('patients')
        .populate({
            path: 'visits',
            populate: {
                path: 'doctor',
                model: 'Doctor'
            }
        });

    // if (!clinicHistory || clinicHistory.length === 0) {
    //     res.status(404).json({ message: "No hay historias clínicas para esta fecha" });
    //     return;
    // }

    if (!clinicHistory || clinicHistory.length === 0) {
        res.status(404);
        throw new Error("Sin historias clínicas.");
    }

    res.status(200).json(clinicHistory);
});


// Crear o actualizar historia clínica
const createClinicHistory = asyncHandler(async (req, res) => {
    const { dni, visits } = req.body;

    // Validación de campos obligatorios
    if (!dni) {
        res.status(400);
        throw new Error("El DNI del paciente es obligatorio.");
    }

    if (!visits || visits.length !== 1) {
        res.status(400);
        throw new Error("Debe proporcionar exactamente una visita.");
    }

    // Buscar si el paciente existe
    const patient = await Patient.findOne({ dni });
    if (!patient) {
        res.status(400);
        throw new Error("El paciente no existe.");
    }

    // Verificar que la visita proporcionada exista en la base de datos
    const visitExists = await Visit.findById(visits[0]);
    if (!visitExists) {
        res.status(400);
        throw new Error("La visita proporcionada no existe.");
    }

    // Verificar si ya existe una historia clínica para el paciente
    const clinicHistoryExists = await ClinicHistory.findOne({ patients: patient._id });

    if (clinicHistoryExists) {
        res.status(400);
        throw new Error("El paciente ya tiene una historia clínica");
    }

    // Crear una nueva historia clínica
    const clinicHistory = await ClinicHistory.create({
        patients: patient._id,
        visits
    });

    res.status(201).json(clinicHistory);
});


// Actualizar historia clínica
const updateClinicHistory = asyncHandler(async (req, res) => {
    const { visits } = req.body;
    const { id } = req.params;

    // Validar que se haya proporcionado exactamente una visita
    if (!visits || !Array.isArray(visits) || visits.length !== 1) {
        res.status(400);
        throw new Error("Debe proporcionar exactamente una visita como un arreglo.");
    }

    // Verificar que la visita proporcionada exista en la base de datos
    const visitExists = await Visit.findById(visits[0]);
    if (!visitExists) {
        res.status(400);
        throw new Error("La visita proporcionada no existe.");
    }

    // Buscar el historial clínico existente
    const clinicHistory = await ClinicHistory.findById(id);

    if (!clinicHistory) {
        res.status(404);
        throw new Error("La historia clínica no existe.");
    }

    // Verificar si la visita ya está en el historial clínico
    if (clinicHistory.visits.includes(visits[0])) {
        res.status(400);
        throw new Error("La visita ya está incluida en la historia clínica.");
    }

    // Actualizar el historial clínico agregando la nueva visita
    clinicHistory.visits.push(visits[0]);
    const updatedClinicHistory = await clinicHistory.save();

    res.status(200).json(updatedClinicHistory);
});


// Eliminar historia clínica
const deleteClinicHistory = asyncHandler(async (req, res) => {
    const clinicHistory = await ClinicHistory.findById(req.params.id);
    if (!clinicHistory) {
        res.status(400);
        throw new Error("La historia clínica no existe");
    }

    await clinicHistory.deleteOne();
    res.status(200).json({ id: req.params.id });
});

export {
    getClinicHistory,
    getClinicHistoryByDni,
    getClinicHistoryByDate,
    createClinicHistory,
    updateClinicHistory,
    deleteClinicHistory
};
