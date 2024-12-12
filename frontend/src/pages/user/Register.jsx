import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";

const Register = () => {
  const [formData, setFormData] = useState({
    dni: "",
    password: "",
    password2: "",
    names: "",
    lastName: "",
    email: "",
  });

  const { dni, password, password2, names, lastName, email } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Registro exitoso");
      navigate("/");
    }

    // Resetea el estado de autenticación después de manejar éxito o error
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Las contraseñas no coinciden");
    } else {
      const userData = {
        dni,
        password,
        names,
        lastName,
        email,
      };
      // Dispatch de la acción de registro
      dispatch(register(userData));
    }
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <section className="margin-login-register container d-flex align-items-center justify-content-center">
        <div className="card shadow-lg p-4" style={{ maxWidth: "900px", width: "100%" }}>
          <div className="text-center mb-4">
            <h2>
              <FaUser /> Registrar
            </h2>
            <p className="text-muted">Por favor, crea tu cuenta</p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="dni" className="form-label">DNI</label>
                <input
                  type="number"
                  className="form-control"
                  id="dni"
                  name="dni"
                  value={dni}
                  placeholder="Ingresa tu DNI"
                  onChange={onChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="names" className="form-label">Nombres</label>
                <input
                  type="text"
                  className="form-control"
                  id="names"
                  name="names"
                  value={names}
                  placeholder="Ingresa tus nombres"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  placeholder="Ingresa tus apellidos"
                  onChange={onChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Ingresa tu email"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Ingresa tu contraseña"
                  onChange={onChange}
                />
              </div>
              <div className="col-md-6 mb-4">
                <label htmlFor="password2" className="form-label">Confirmar Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  name="password2"
                  value={password2}
                  placeholder="Confirma tu contraseña"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Registrar
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Register;
