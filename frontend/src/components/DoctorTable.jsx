import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { updateDoctor, deleteDoctor } from "../features/doctor/doctorSlice";
import { toast } from "react-toastify";

const DoctorTable = ({ doctor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // const currentView = new URLSearchParams(location.search).get("view");

  const handleDelete = (id) => {
    dispatch(deleteDoctor(id));
    toast.success("Doctor eliminado exitosamente");
  };

  const handleUpdate = (id) => {
    navigate(`/admin/doctor/${id}?view=update`);
    // dispatch(updateDoctor(id));
  };

  return (
    <div className="container mt-2 mb-2">
      <table className="table table-striped table-hover table-bordered text-center">
        <thead className="table-dark fw-bold">
          <tr>
            <th scope="col">DNI</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Especialidad</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Email</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {doctor.map((doc) => (
            <React.Fragment key={doc._id}>
              <tr>
                <th scope="row">{doc.dni}</th>
                <td>{doc.name}</td>
                <td>{doc.lastName}</td>
                <td>{doc.specialty}</td>
                <td>{doc.phone}</td>
                <td>{doc.email ? doc.email : "N/A"}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleUpdate(doc.dni)} 
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(doc._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorTable;
