import React, { useState } from "react";

const ClinicHistoryTable = ({ clinicHistory }) => {
  const [expandedPatient, setExpandedPatient] = useState(null);
  const [expandedVisit, setExpandedVisit] = useState({}); // Control de visibilidad por visita

  const handleToggleVisits = (patientId) => {
    setExpandedPatient(expandedPatient === patientId ? null : patientId);
  };

  const handleToggleFiles = (visitId) => {
    setExpandedVisit((prevState) => ({
      ...prevState,
      [visitId]: !prevState[visitId],
    }));
  };

  return (
    <div className="container mt-2 mb-2">
      <table className="table table-striped table-hover table-bordered text-center">
        <thead className="table-dark fw-bold">
          <tr>
            <th scope="col">DNI</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Edad</th>
            <th scope="col">Género</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clinicHistory.length > 0 ? (
            clinicHistory.map((history) => (
              <React.Fragment key={history._id}>
                <tr>
                  <th scope="row">{history.patients.dni}</th>
                  <td>{history.patients.name}</td>
                  <td>{history.patients.lastName}</td>
                  <td>{history.patients.age}</td>
                  <td>{history.patients.gender}</td>
                  <td>{history.patients.phone}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleToggleVisits(history.patients._id)}
                    >
                      {expandedPatient === history.patients._id
                        ? "Ocultar"
                        : "Visitas"}
                    </button>
                  </td>
                </tr>
                {expandedPatient === history.patients._id && (
                  <tr>
                    <td colSpan="7">
                      <table className="table table-hover table-bordered text-center">
                        <thead className="table-light fw-bold">
                          <tr>
                            <th scope="col">Fecha de Visita</th>
                            <th scope="col">Especialidad</th>
                            <th scope="col">Doctor</th>
                            <th scope="col">Archivos</th>
                          </tr>
                        </thead>
                        <tbody>
                          {history.visits.length > 0 ? (
                            history.visits.map((visit) => (
                              <React.Fragment key={visit._id}>
                                <tr>
                                  <td>
                                    {new Date(
                                      visit.createdAt
                                    ).toLocaleDateString()}
                                  </td>
                                  <td>{visit.speciality}</td>
                                  <td>
                                    {visit.doctor.name} {visit.doctor.lastName}
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-secondary"
                                      onClick={() => handleToggleFiles(visit._id)}
                                    >
                                      {expandedVisit[visit._id]
                                        ? "Ocultar Archivos"
                                        : "Ver Archivos"}
                                    </button>
                                  </td>
                                </tr>
                                {expandedVisit[visit._id] && visit.files.length > 0 && (
                                  <tr>
                                    <td colSpan="4">
                                      <div className="d-flex flex-column align-items-center gap-2">
                                        {visit.files.map((file, index) => (
                                          <div
                                            key={index}
                                            style={{
                                              width: "100%",
                                              maxWidth: "600px",
                                            }}
                                            className="text-center"
                                          >
                                            <p className="fw-bold mb-1">
                                              {file.description || "Sin descripción"}
                                            </p>
                                            {file.typeFile
                                              .toLowerCase()
                                              .startsWith("image") ? (
                                              <img
                                                src={file.url}
                                                alt={file.description || "Imagen"}
                                                style={{
                                                  width: "100%",
                                                  height: "auto",
                                                  borderRadius: "5px",
                                                }}
                                              />
                                            ) : (
                                              <a
                                                href={file.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-link"
                                              >
                                                {file.description || "Archivo"}
                                              </a>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4">No hay visitas registradas</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No se encontraron resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClinicHistoryTable;
