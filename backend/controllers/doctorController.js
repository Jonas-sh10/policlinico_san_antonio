import asyncHandler from "express-async-handler";
import Doctor from "../model/clinic_history/doctorModel.js";

const getDoctors = asyncHandler(async (req, res) => {
    const doctor = await Doctor.find({ isActive: true });
    res.status(200).json(doctor);
});

const getDoctorByDni = asyncHandler(async (req, res) => {
    console.log(req.params.dni);
    const doctor = await Doctor.find({ dni: req.params.dni, isActive: true });
    if (doctor.length === 0) {
        res.status(400);
        throw new Error("El/La doctor(a) no existe");
    }
    res.status(200).json(doctor);
});

const getDoctorBySpecialty = asyncHandler(async (req, res) => {
    const doctor = await Doctor.find({ specialty: req.params.specialty, isActive: true });
    if (doctor.length === 0) {
        res.status(400);
        throw new Error("El/La doctor(a) no existe");
    }
    res.status(200).json(doctor);
});

const createDoctor = asyncHandler(async (req, res) => {
    const { name, lastName, dni, specialty, phone } = req.body;

    // Validación de campos obligatorios
    const requiredFields = {
        "Nombre": name,
        "Apellido": lastName,
        "DNI": dni,
        "Especialidad": specialty,
        "Teléfono": phone
    };
    for (const [field, value] of Object.entries(requiredFields)) {
        if (!value) {
            res.status(400);
            throw new Error(`El campo '${field}' es obligatorio.`);
        }
    }

    const doctorExists = await Doctor.findOne({ dni, isActive: true });
    if (doctorExists) {
        res.status(400);
        throw new Error("El/La doctor(a) no existe");
    } else {
        const doctor = await Doctor.create({ ...req.body });
        res.status(201).json([doctor]);
    }
});

const updateDoctor = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findOne({ dni: req.params.dni, isActive: true });
    console.log(doctor);
    

    if (!doctor) {
        res.status(400);
        throw new Error("El/La doctor(a) no existe");
    }

    const doctorUpdated = await Doctor.findOneAndUpdate(
        { dni: req.params.dni, isActive: true }, 
        req.body, 
        { new: true }
    );
    res.status(200).json([doctorUpdated]);
});

const deleteDoctor = asyncHandler(async (req, res) => {
    if (req.query.destroy === "true") {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
            res.status(400);
            throw new Error("El/La doctor(a) no existe");
        }
        res.status(200).json({ id: req.params.id });
    }


    const doctorUpdated = await Doctor.findByIdAndUpdate(req.params.id, { isActive: false }, { new: false });
    if (doctorUpdated === null || doctorUpdated.isActive === false) {
        throw new Error("El/La doctor(a) no existe o está inactivo");
    }
    res.status(200).json({ id: req.params.id });
});

export {
    getDoctors,
    getDoctorByDni,
    getDoctorBySpecialty,
    createDoctor,
    updateDoctor,
    deleteDoctor
};


