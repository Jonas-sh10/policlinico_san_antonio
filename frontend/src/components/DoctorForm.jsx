import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createDoctor, updateDoctor } from "../features/doctor/doctorSlice";
import { specialties } from "../utils/specialties";

const DoctorForm = () => {
  const [formData, setFormData] = useState({
    dni: "",
    name: "",
    lastName: "",
    specialty: "",
    phone: "",
    email: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const { dni, name, lastName, specialty, phone, email } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dni: paramDni } = useParams();

  const { doctors, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.doctor
  );

  useEffect(() => {
    if (paramDni) {
      const doctorToEdit = doctors.find((doc) => doc.dni === paramDni);
      if (doctorToEdit) {
        setFormData({
          dni: doctorToEdit.dni,
          name: doctorToEdit.name,
          lastName: doctorToEdit.lastName,
          specialty: doctorToEdit.specialty,
          phone: doctorToEdit.phone,
          email: doctorToEdit.email || "",
        });
        setIsUpdating(true);
      }
    } else {
      setFormData({
        dni: "",
        name: "",
        lastName: "",
        specialty: "",
        phone: "",
        email: "",
      });
      setIsUpdating(false);
    }
  }, [doctors, paramDni]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !lastName || !dni || !specialty || !phone) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    if (isUpdating) {
      dispatch(updateDoctor({ dni: paramDni, doctorData: formData }))
        .unwrap()
        .then(() => {
          toast.success("Doctor actualizado exitosamente");
          navigate("/admin/doctor");
        })
        .catch(() => {
          toast.error("Error al actualizar el doctor");
        });
    } else {
      dispatch(createDoctor(formData))
        .unwrap()
        .then(() => {
          toast.success("Doctor creado exitosamente");
          navigate("/admin/doctor");
        })
        .catch(() => {
          toast.error("Error al crear el doctor");
        });
    }
  };

  return (
    <section className="rounded text-dark">
      <div className="navbar bg-body-tertiary justify-content-center rounded">
        <div className="container-fluid mb-2 mt-2">
          <div className="heading container">
            <p>{isUpdating ? "Actualizar Doctor" : "Registrar Doctor"}</p>
          </div>
          <form onSubmit={onSubmit} className="row g-3">
            <div className="col-md-6">
              <label htmlFor="inputName" className="form-label">
                Nombres
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Ingrese los nombres"
                name="name"
                value={name}
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
                placeholder="Ingrese los apellidos"
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
                type="number"
                className="form-control"
                id="inputDni"
                placeholder="Ingrese el DNI"
                name="dni"
                value={dni}
                onChange={onChange}
                disabled={isUpdating}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPhone" className="form-label">
                Teléfono
              </label>
              <input
                type="number"
                className="form-control"
                id="inputPhone"
                placeholder="Ingrese el teléfono"
                name="phone"
                value={phone}
                onChange={onChange}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  @
                </span>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Ingrese el email"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="col-md-12">
              <select
                className="form-select"
                aria-label="Default select example"
                id="inputSpeciality"
                name="specialty"
                value={specialty}
                onChange={onChange}
              >
                <option value="" disabled>
                  Seleccione una especialidad
                </option>
                {specialties.map((specialty) => (
                  <option key={specialty.value} value={specialty.value}>
                    {specialty.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">
                {isUpdating ? "Actualizar" : "Registrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DoctorForm;
