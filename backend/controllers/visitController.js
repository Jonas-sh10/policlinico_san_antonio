import asyncHandler from "express-async-handler";
import Visit from "../model/clinic_history/visitModel.js";
import Doctor from "../model/clinic_history/doctorModel.js";

const getVisits = asyncHandler(async (req, res) => {
    const visits = await Visit.find();
    res.status(200).json(visits);
});

const getVisitById = asyncHandler(async (req, res) => {
    const visit = await Visit.findById(req.params.id);
    if (!visit) {
        res.status(400);
        throw new Error("La visita no existe");
    }
    res.status(200).json(visit);
});

const createVisit = asyncHandler(async (req, res) => {
    const { speciality, doctor } = req.body;

    // Validación de campos obligatorios
    const requiredFields = { 
        "Especialidad": speciality, 
        "Doctor": doctor 
    };
    for (const [field, value] of Object.entries(requiredFields)) {
        if (!value) {
            res.status(400);
            throw new Error(`El campo '${field}' es obligatorio.`);
        }
    }

    const doctorExists = await Doctor.findById(doctor);
    if (!doctorExists) {
        res.status(400);
        throw new Error("El/La doctor(a) no existe");
    }

    // WARNING: Falta validar que el doctor no este en una visita

    const visit = await Visit.create({
        ...req.body,
        user: req.user._id
    });
    res.status(201).json(visit);
});

const updateVisit = asyncHandler(async (req, res) => {
    const visit = await Visit.findById(req.params.id);

    if (!visit) {
        res.status(400);
        throw new Error("La visita no existe");
    }

    const doctorExists = await Doctor.findById(req.body.doctor);
    if (!doctorExists) {
        res.status(400);
        throw new Error("El/La doctor(a) no existe");
    }

    const visitUpdated = await Visit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // const visitUpdated = await Visit.findByIdAndUpdate(req.params.id, { ...req.body, user: req.user._id}, { new: true });
    res.status(200).json(visitUpdated);
});

const deleteVisit = asyncHandler(async (req, res) => {
    const visit = await Visit.findById(req.params.id);

    if (!visit) {
        res.status(404);
        throw new Error("La visita no existe");
    }

    await Visit.deleteOne();
    res.status(200).json({ id: req.params.id });
});

export {
    getVisits,
    getVisitById,
    createVisit,
    updateVisit,
    deleteVisit
};
