import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useMatch } from "react-router-dom";
import "./index.css";

const Navbar = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const isSingleMoviePage = useMatch("/movie/:id");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActivePage = (path) => (location.pathname === path ? "active" : "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const shouldHideSearch = isSingleMoviePage;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>movieDB</h1>
      </div>
      <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <li>
          <Link className={`nav-link-items ${isActivePage("/")}`} to="/">
            Popular
          </Link>
        </li>
        <li>
          <Link
            className={`nav-link-items ${isActivePage("/top-rated")}`}
            to="/top-rated"
          >
            Top Rated
          </Link>
        </li>
        <li>
          <Link
            className={`nav-link-items ${isActivePage("/upcoming")}`}
            to="/upcoming"
          >
            Upcoming
          </Link>
        </li>
        
        {!shouldHideSearch && (
          <div className="navbar-search">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn">
                <FaSearch />
              </button>
            </form>
          </div>
        )}
      </ul>
      <button
        type="button"
        className="hamburger"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
    </nav>
  );
};

export default Navbar;
