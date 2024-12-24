import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActivePage = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Tarun Kumar</h1>
      </div>
      <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <li>
          <Link className={`nav-link-items ${isActivePage("/about")}`} to="/about">
            About
          </Link>
        </li>
        <li>
          <Link
            className={`nav-link-items ${isActivePage("/projects")}`}
            to="/projects"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link className={`nav-link-items ${isActivePage("/skills")}`} to="/skills">
            Skills
          </Link>
        </li>
        <li>
          <Link
            className={`nav-link-items ${isActivePage("/contact")}`}
            to="/contact"
          >
            Contact
          </Link>
        </li>
      </ul>
      <button
        type="button"
        className="hamburger"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Navbar;
