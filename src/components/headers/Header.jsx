import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { FavouriteContext } from "../../contexts/FavouriteContext";
import SearchBar from "../headers/SearchBar";

function Header() {
  const { cartItems } = useContext(CartContext);
  const { favourites } = useContext(FavouriteContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [navbarExpanded, setNavbarExpanded] = useState(false);

  const handleNavToggle = () => {
    setNavbarExpanded(!navbarExpanded);
  };

  const handleProfileBlur = (e) => {
    const profileDropdown = e.currentTarget;
    if (!profileDropdown.contains(e.relatedTarget)) {
      setShowProfileMenu(false);
    }
  };

  return (
    <header className="sticky-top bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light py-3">
        <div className="container">
          <Link className="navbar-brand me-4" to="/">
            <h1 className="fs-3 m-0 fw-bold">
              Shop<span className="text-primary">Easy</span>
            </h1>
          </Link>

          <div className="d-flex align-items-center gap-3 d-lg-none ms-auto">
            <Link
              to="/favorites"
              className="btn btn-light rounded-circle position-relative"
            >
              <i className="bi bi-heart" style={{ fontSize: "2rem" }}></i>
              {favourites.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {favourites.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="btn btn-light rounded-circle position-relative"
            >
              <i className="bi bi-cart" style={{ fontSize: "2rem" }}></i>
              {cartItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <button
              className="navbar-toggler border-0"
              type="button"
              onClick={handleNavToggle}
              aria-expanded={navbarExpanded}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div
            className={`collapse navbar-collapse ${
              navbarExpanded ? "show" : ""
            }`}
            id="navbarContent"
          >
            <div
              className="d-none d-lg-block mx-auto"
              style={{ width: "450px" }}
            >
              <SearchBar className="search-form" />
            </div>

            <div className="d-block d-lg-none mb-3 mt-2">
              <SearchBar className="search-form" />
            </div>
          </div>

          <div className="d-none d-lg-flex align-items-center ms-auto">
            <div
              className="dropdown mx-2"
              onBlur={handleProfileBlur}
              tabIndex="-1"
            >
              <button
                className="btn btn-light rounded-circle"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-expanded={showProfileMenu}
              >
                <i className="bi bi-person" style={{ fontSize: "2rem" }}></i>
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end shadow-sm ${
                  showProfileMenu ? "show" : ""
                }`}
              >
                <li>
                  <Link className="dropdown-item" to="/profile">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/orders">
                    My Orders
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/logout">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>

            <Link
              to="/favorites"
              className="btn btn-light rounded-circle position-relative"
            >
              <i className="bi bi-heart" style={{ fontSize: "2rem" }}></i>
              {favourites.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {favourites.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="btn btn-light rounded-circle position-relative"
            >
              <i className="bi bi-cart" style={{ fontSize: "2rem" }}></i>
              {cartItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      <div
        className={`bg-light py-2 d-lg-none ${
          navbarExpanded ? "d-block" : "d-none"
        }`}
      >
        <div className="container">
          <div className="d-flex justify-content-around border-top pt-2">
            <Link to="/profile" className="text-decoration-none text-dark">
              <i className="bi bi-person me-1"></i> Profile
            </Link>
            <Link to="/orders" className="text-decoration-none text-dark">
              <i className="bi bi-box me-1"></i> Orders
            </Link>
            <Link to="/logout" className="text-decoration-none text-dark">
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </Link>
          </div>
        </div>
      </div>

      <style>
        {`
          .search-form .input-group {
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          
          .search-form .form-control {
            border-radius: 4px 0 0 4px;
            border: 1px solid #e0e0e0;
            padding: 10px 15px;
            font-size: 0.95rem;
          }
          
          .search-form .form-control:focus {
            box-shadow: none;
            border-color: #80bdff;
          }
          
          .search-form .btn {
            border-radius: 0 4px 4px 0;
            background-color: var(--bs-primary);
            border: 1px solid var(--bs-primary);
            color: white;
            padding: 10px 15px;
          }
          
          .search-form .btn:hover {
            background-color: var(--bs-primary-darker, #0069d9);
            border-color: var(--bs-primary-darker, #0069d9);
          }
          
          @media (max-width: 992px) {
            .search-form .input-group {
              max-width: 100%;
            }
          }
        `}
      </style>
    </header>
  );
}

export default Header;
