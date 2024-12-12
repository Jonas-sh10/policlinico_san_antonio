import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getDoctor, getDoctorByDni, getDoctorBySpecialty, reset } from "../../features/doctor/doctorSlice";
import DoctorForm from "../../components/DoctorForm";
import DoctorTable from "../../components/DoctorTable";
import { specialties } from "../../utils/specialties";

const Doctor = () => {
  const [specialty, setSpecialty] = useState("");
  const [dni, setDni] = useState("");
  const [searchDni, setSearchDni] = useState(""); // Estado separado para la búsqueda

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { doctors, isLoading, isError, message } = useSelector((state) => state.doctor);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [navigate, user, dispatch]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const view = query.get("view");

    if (view === "viewAll") {
      dispatch(getDoctor());
    } else if (view === "viewByDni" && searchDni) {
      dispatch(getDoctorByDni(searchDni));
    } else if (view === "viewBySpecialty" && specialty) {
      dispatch(getDoctorBySpecialty(specialty));
    }
  }, [dispatch, location.search, searchDni, specialty]);

  const handleSpecialtyChange = (event) => {
    const selectedSpecialty = event.target.value;
    setSpecialty(selectedSpecialty);
    navigate(`/admin/doctor?view=viewBySpecialty`);
  };

  const onChangeDni = (event) => {
    setDni(event.target.value);
  };

  const handleSearchByDni = () => {
    if (!dni) {
      toast.error("El DNI es obligatorio");
      return;
    }
    setSearchDni(dni); // Actualizar el estado de búsqueda
    setSpecialty("");
    navigate(`/admin/doctor?view=viewByDni`);
  };

  const toggleView = (view) => {
    setSpecialty("");
    setSearchDni(""); // Limpiar búsqueda de DNI al cambiar de vista
    navigate(`/admin/doctor?view=${view}`);
  };

  const renderContent = () => {
    if (isLoading) return <p>Cargando...</p>;

    const currentView = new URLSearchParams(location.search).get("view");

    if (currentView === "register" || currentView === "update") {
      return <DoctorForm />;
    }

    if (isError) {
      return (
        <p className="bg-danger text-white mt-2 mb-2 p-1 rounded w-50 text-center">
          {message}
        </p>
      );
    }

    if (
      doctors.length === 0 &&
      (currentView === "viewByDni" ||
        currentView === "viewBySpecialty" ||
        currentView === "viewAll")
    ) {
      return (
        <p className="bg-danger text-white mt-2 mb-2 p-1 rounded w-50 text-center">
          No se encontraron resultados
        </p>
      );
    }

    if (
      currentView === "viewByDni" ||
      currentView === "viewBySpecialty" ||
      currentView === "viewAll"
    ) {
      return doctors.length > 0 ? <DoctorTable doctor={doctors} /> : "";
    }
  };

  return (
    <section className="container-fluid bg-secondary pt-3 pb-3 rounded text-dark">
      <div className="navbar bg-body-tertiary justify-content-center">
        <div className="container-fluid">
          <div className="heading container">
            <p>Gestionar Doctor</p>
          </div>
          <button
            onClick={() => toggleView("register")}
            className="btn btn-outline-success mb-2 w-100"
            type="button"
          >
            Registrar Doctor
          </button>
          <div className="d-flex">
            <button
              onClick={() => toggleView("viewAll")}
              className="btn btn-outline-success me-2"
              type="button"
            >
              Visualizar Doctores
            </button>
          </div>
          <div className="d-flex">
            <select
              className="form-select"
              aria-label="Default select example"
              id="speciality"
              name="specialty"
              value={specialty}
              onChange={handleSpecialtyChange}
            >
              <option value="" disabled>
                Seleccione una especialidad
              </option>
              {specialties.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="number"
              id="dni"
              name="dni"
              value={dni}
              placeholder="Ingrese el DNI"
              onChange={onChangeDni}
            />
            <button
              onClick={handleSearchByDni}
              className="btn btn-outline-success"
              type="button"
            >
              Buscar
            </button>
          </div>
        </div>
        {renderContent()}
      </div>
    </section>
  );
};

export default Doctor;
