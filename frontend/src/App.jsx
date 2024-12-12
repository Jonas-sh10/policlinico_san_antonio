import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import DashboardLayout from "./components/DashboardLayout"; // Importa el layout
import Dashboard from "./pages/Dashboard";
import Patient from "./pages/clinic_history/Patient";
import Doctor from "./pages/clinic_history/Doctor";
import ClinicHistory from "./pages/clinic_history/ClinicHistory";
import Visit from "./pages/clinic_history/Visit";
import NewClinicHistory from "./pages/clinic_history/NewClinicHistory";
import Report from "./pages/Report";
import Perfil from "./pages/Perfil";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patient" element={<Patient />} />
          <Route path="doctor/" element={<Doctor />} />
          <Route path="doctor/:dni" element={<Doctor />} /> {/* Nueva ruta para el ID */}
          <Route path="clinic-history" element={<ClinicHistory />} />
          <Route path="visit" element={<Visit />} />
          <Route path="new-clinic-history" element={<NewClinicHistory />} />
          <Route path="report" element={<Report />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
