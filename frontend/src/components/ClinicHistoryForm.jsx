import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VisitForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    dni: "",
    email: "",
    dateOfBirth: "",
    age: "",
    sex: "",
    reason: "",
    notes: "",
    preExistingConditions: "",
    allergies: "",
    currentMedications: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    height: "",
    weight: "",
    systolicBP: "",
    diastolicBP: "",
  });

  const {
    patientName,
    dni,
    email,
    dateOfBirth,
    age,
    sex,
    reason,
    notes,
    preExistingConditions,
    allergies,
    currentMedications,
    emergencyContactName,
    emergencyContactNumber,
    height,
    weight,
    systolicBP,
    diastolicBP,
  } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!patientName || !dni || !email || !dateOfBirth || !reason) {
      toast.error("Por favor complete todos los campos obligatorios");
      return;
    }

    toast.success("Historial clínico guardado correctamente");
    navigate("/admin/visits");
  };

  return (
    <section className="rounded text-dark">
      <div className="navbar bg-body-tertiary justify-content-center rounded">
        <div className="container-fluid mb-2 mt-2">
          <div className="heading container">
            <p>Registrar Historial Clínico</p>
          </div>
          <form onSubmit={onSubmit} className="row g-3">
            <div className="col-md-6">
              <label htmlFor="inputPatientName" className="form-label">
                Nombre del Paciente
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPatientName"
                name="patientName"
                value={patientName}
                onChange={onChange}
                placeholder="Ingrese el nombre del paciente"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputDNI" className="form-label">
                DNI
              </label>
              <input
                type="text"
                className="form-control"
                id="inputDNI"
                name="dni"
                value={dni}
                onChange={onChange}
                placeholder="Ingrese el DNI"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputEmail" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Ingrese el correo electrónico"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputDateOfBirth" className="form-label">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                className="form-control"
                id="inputDateOfBirth"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={onChange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputAge" className="form-label">
                Edad
              </label>
              <input
                type="number"
                className="form-control"
                id="inputAge"
                name="age"
                value={age}
                onChange={onChange}
                placeholder="Ingrese la edad"
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputSex" className="form-label">
                Sexo
              </label>
              <select
                className="form-select"
                id="inputSex"
                name="sex"
                value={sex}
                onChange={onChange}
              >
                <option value="">Seleccione</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputReason" className="form-label">
                Motivo de la Visita
              </label>
              <input
                type="text"
                className="form-control"
                id="inputReason"
                name="reason"
                value={reason}
                onChange={onChange}
                placeholder="Ingrese el motivo"
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputPreExistingConditions" className="form-label">
                Condiciones Médicas Preexistentes
              </label>
              <textarea
                className="form-control"
                id="inputPreExistingConditions"
                name="preExistingConditions"
                value={preExistingConditions}
                onChange={onChange}
                rows="3"
                placeholder="Ingrese condiciones médicas previas"
              ></textarea>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputAllergies" className="form-label">
                Alergias
              </label>
              <textarea
                className="form-control"
                id="inputAllergies"
                name="allergies"
                value={allergies}
                onChange={onChange}
                rows="2"
                placeholder="Ingrese alergias conocidas"
              ></textarea>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCurrentMedications" className="form-label">
                Medicamentos Actuales
              </label>
              <textarea
                className="form-control"
                id="inputCurrentMedications"
                name="currentMedications"
                value={currentMedications}
                onChange={onChange}
                rows="2"
                placeholder="Ingrese medicamentos actuales"
              ></textarea>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputEmergencyContactName" className="form-label">
                Nombre del Contacto de Emergencia
              </label>
              <input
                type="text"
                className="form-control"
                id="inputEmergencyContactName"
                name="emergencyContactName"
                value={emergencyContactName}
                onChange={onChange}
                placeholder="Ingrese el nombre del contacto"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputEmergencyContactNumber" className="form-label">
                Número de Teléfono
              </label>
              <input
                type="tel"
                className="form-control"
                id="inputEmergencyContactNumber"
                name="emergencyContactNumber"
                value={emergencyContactNumber}
                onChange={onChange}
                placeholder="Ingrese el número de teléfono"
              />
            </div>
            <div className="col-md-12 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Guardar Historial
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VisitForm;
