import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserMd,
  FaHistory,
  FaCalendarAlt,
  FaFileMedical,
  FaChartBar,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <span className="menu-title">
          <IoHome />
          {!collapsed && "Menú"}
        </span>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <AiOutlineMenu />
        </button>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Link to="/admin/dashboard">
            <FaTachometerAlt />
            <span className="full-text">Dashboard</span>
            <span className="collapsed-label">Inicio</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/patient">
            <FaUserPlus />
            <span className="full-text">Gestión de Pacientes</span>
            <span className="collapsed-label">Paciente</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/doctor">
            <FaUserMd />
            <span className="full-text">Gestión de Doctores</span>
            <span className="collapsed-label">Doctor</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/new-clinic-history">
            <FaFileMedical />
            <span className="full-text">Crear Historial Clínico</span>
            <span className="collapsed-label">Crear</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/clinic-history">
            <FaHistory />
            <span className="full-text">Historial Clínico</span>
            <span className="collapsed-label">Historial</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/visit">
            <FaCalendarAlt />
            <span className="full-text">Citas Médicas</span>
            <span className="collapsed-label">Citas</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/report">
            <FaChartBar />
            <span className="full-text">Reportes</span>
            <span className="collapsed-label">Reportes</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/perfil">
            <FaUser />
            <span className="full-text">Perfil del Usuario</span>
            <span className="collapsed-label">Perfil</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
