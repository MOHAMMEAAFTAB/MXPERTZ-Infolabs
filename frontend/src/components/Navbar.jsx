

// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Hospital</Link>
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-light" to="/doctors">Doctors</Link>
          <Link className="btn btn-outline-light" to="/patients">Patients</Link>
          <Link className="btn btn-success" to="/book">Book</Link>
          <Link className="btn btn-warning" to="/appointments">My Appointments</Link>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
