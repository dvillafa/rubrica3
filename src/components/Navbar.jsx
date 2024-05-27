import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Navbar = ({ firebaseUser }) => {
  const navigate = useNavigate();
  const cerrarSesion = () => {
    auth.signOut().then(() => {
      navigate('login');
    });
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">CDU CUC</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="btn btn-dark mr-2" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              {firebaseUser !== null && firebaseUser.email === 'admin@admin.com' ? (
                <Link className="btn btn-dark mr-2" to="/admin">Admin</Link>
              ) : null}
            </li>
            <li className="nav-item">
              {firebaseUser !== null ? (
                <Link className="btn btn-dark mr-2" to="/salasdisponibles">Salas</Link>
              ) : null}
            </li>
            <li className="nav-item">
              {firebaseUser !== null ? (
                <Link className="btn btn-dark mr-2" to="/salasreservadas">Reservas</Link>
              ) : null}
            </li>
            <li className="nav-item">
              {firebaseUser !== null ? (
                <button className="btn btn-dark mr-2" onClick={() => cerrarSesion()}>Cerrar sesión</button>
              ) : (
                <Link className="btn btn-dark mr-2" to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;