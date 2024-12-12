import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { specialties } from "../utils/specialties"; // Importar especialidades

const VisitForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dni: "",
    specialty: "",
    doctor: "",
    description: "",
    filePrescription: null,
    fileDiagnosticImage: null,
    date: new Date().toISOString().split("T")[0], // Fecha actual
    time: new Date().toLocaleTimeString("en-GB"), // Hora actual en formato 24h
  });

  const {
    firstName,
    lastName,
    dni,
    specialty,
    doctor,
    description,
    filePrescription,
    fileDiagnosticImage,
    date,
    time,
  } = formData;

  const navigate = useNavigate();

  // Manejar el cambio en los campos del formulario
  const onChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value, // Si es archivo, tomar el primer archivo
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    if (!firstName || !lastName || !dni || !specialty || !doctor || !description) {
      toast.error("Por favor complete todos los campos obligatorios");
      return;
    }

    // Aquí iría la lógica para manejar la creación/actualización de la visita
    toast.success("Visita registrada correctamente");
    navigate("/admin/visits");
  };

  return (
    <section className="rounded text-dark">
      <div className="navbar bg-body-tertiary justify-content-center rounded">
        <div className="container-fluid mb-2 mt-2">
          <div className="heading container">
            <p>Registrar Cita Médica</p>
          </div>
          <form onSubmit={onSubmit} className="row g-3">
            <div className="col-md-6">
              <label htmlFor="inputFirstName" className="form-label">
                Nombres
              </label>
              <input
                type="text"
                className="form-control"
                id="inputFirstName"
                placeholder="Ingrese nombres"
                name="firstName"
                value={firstName}
                onChange={onChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputLastName" className="form-label">
                Apellidos
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLastName"
                placeholder="Ingrese apellidos"
                name="lastName"
                value={lastName}
                onChange={onChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputDni" className="form-label">
                DNI
              </label>
              <input
                type="text"
                className="form-control"
                id="inputDni"
                placeholder="Ingrese el DNI"
                name="dni"
                value={dni}
                onChange={onChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputSpecialty" className="form-label">
                Especialidad
              </label>
              <select
                className="form-select"
                id="inputSpecialty"
                name="specialty"
                value={specialty}
                onChange={onChange}
              >
                <option value="" disabled>
                  Seleccione una especialidad
                </option>
                {specialties.map((spec) => (
                  <option key={spec.value} value={spec.value}>
                    {spec.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputDoctor" className="form-label">
                Doctor
              </label>
              <input
                type="text"
                className="form-control"
                id="inputDoctor"
                placeholder="Ingrese el nombre del doctor"
                name="doctor"
                value={doctor}
                onChange={onChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputDate" className="form-label">
                Fecha
              </label>
              <input
                type="text"
                className="form-control"
                id="inputDate"
                name="date"
                value={date}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputTime" className="form-label">
                Hora
              </label>
              <input
                type="text"
                className="form-control"
                id="inputTime"
                name="time"
                value={time}
                readOnly
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputDescription" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control"
                id="inputDescription"
                rows="3"
                placeholder="Ingrese una descripción"
                name="description"
                value={description}
                onChange={onChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="filePrescription" className="form-label">
                Receta Médica
              </label>
              <input
                type="file"
                className="form-control"
                id="filePrescription"
                name="filePrescription"
                onChange={onChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="fileDiagnosticImage" className="form-label">
                Imágenes Diagnósticas
              </label>
              <input
                type="file"
                className="form-control"
                id="fileDiagnosticImage"
                name="fileDiagnosticImage"
                onChange={onChange}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">
                Guardar Visita
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VisitForm;
