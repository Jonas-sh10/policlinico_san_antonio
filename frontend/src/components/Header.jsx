import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { PiHospital } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <PiHospital /> San Antonio
      </Link>
      <nav className="nav-links">
        {user ? (
          <div className="user-actions">
            <Link to="/admin/perfil" className="profile-link">
              <FaUser /> <span>{user.names}</span>
            </Link>
            <button className="btn btn-danger" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        ) : (
          <div className="auth-actions">
            <Link to="/login" className="auth-link">
              <FaSignInAlt /> Login
            </Link>
            <Link to="/register" className="auth-link">
              <FaUser /> Registrar
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
