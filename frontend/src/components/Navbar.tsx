import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">S</span>
        StudentHub
      </Link>

      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/students">Students</NavLink>
        <Link to="/students/add" className="nav-button">+ Add Student</Link>
      </div>
    </nav>
  );
}
