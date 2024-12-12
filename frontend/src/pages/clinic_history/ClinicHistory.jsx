import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "../../components/ClinicHistoryTable";
import {
  getClinicHistoryByDni,
  getClinicHistoryByDate,
  reset,
} from "../../features/clinic_history/clinicHistorySlice";

const ClinicHistory = () => {
  const [dni, setDni] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hasSearched, setHasSearched] = useState(false); // Marca si se ha realizado una búsqueda
  const [searchType, setSearchType] = useState(""); // Nuevo estado para el tipo de búsqueda

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { clinicHistory, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.clinicHistory
  );

  const onChangeDni = (e) => {
    setDni(e.target.value);
  };

  const onSubmitDni = (e) => {
    e.preventDefault();

    if (!dni) {
      toast.error("El DNI es obligatorio");
      return;
    }
    dispatch(getClinicHistoryByDni(dni));
    setHasSearched(true); // Marca que se ha realizado una búsqueda
    setSearchType("dni"); // Establece el tipo de búsqueda
  };

  const onChangeStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const onChangeEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const onSubmitDate = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      toast.error("La fecha es obligatoria");
      return;
    }

    dispatch(getClinicHistoryByDate({ startDate, endDate }));
    setHasSearched(true); // Marca que se ha realizado una búsqueda
    setSearchType("date"); // Establece el tipo de búsqueda
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (isError) {
      toast.error(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, user, isError, message]);

  return (
    <>
      <section className="container-fluid bg-secondary pt-3 pb-3 rounded text-dark">
        <div className="navbar bg-body-tertiary justify-content-center">
          <div className="container-fluid">
            <div className="heading container">
              <p>Historial Clínico</p>
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
                onClick={onSubmitDni}
                className="btn btn-outline-success"
                type="button"
              >
                Buscar
              </button>
            </div>
            <div className="d-flex" role="search">
              <label className="me-2 mt-1 fw-bold">Busqueda:</label>
              <input
                className="form-control me-2"
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={onChangeStartDate}
                max={endDate}
              />
              <input
                className="form-control me-2"
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={onChangeEndDate}
                min={startDate}
                max={new Date().toISOString().split("T")[0]}
              />
              <button
                onClick={onSubmitDate}
                className="btn btn-outline-success"
                type="button"
              >
                Buscar
              </button>
            </div>
          </div>
          {isLoading && <p>Cargando...</p>}
          {isError && !clinicHistory.length && <p>{message}</p>}
          {!isLoading &&
            hasSearched &&
            !isError &&
            clinicHistory.length === 0 && (
              <p className="bg-danger text-white mt-2 mb-2 p-1 rounded w-50 text-center">
                No se encontraron resultados
              </p>
            )}
          {clinicHistory && clinicHistory.length > 0 && (
            <Table clinicHistory={clinicHistory} searchType={searchType} />
          )}
        </div>
      </section>
    </>
  );
};

export default ClinicHistory;
