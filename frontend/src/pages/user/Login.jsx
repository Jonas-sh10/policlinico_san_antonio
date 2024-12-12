import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";

const Login = () => {
  const [formData, setFormData] = useState({
    dni: "",
    password: "",
  });

  const { dni, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/admin/dashboard");
    }

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

    const userData = {
      dni,
      password,
    };

    dispatch(login(userData));
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <div className="d-flex flex-column min-vh-100">
      <section className="margin-login-register container flex-grow-1 d-flex align-items-center justify-content-center">
        <div
          className="card shadow-lg p-4"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <div className="text-center mb-4">
            <h2>
              <FaSignInAlt /> Login
            </h2>
            <p className="text-muted">Por favor, ingrese sus credenciales</p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="dni" className="form-label">
                DNI
              </label>
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
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
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
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
