import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 mb-3 mb-md-0">
            <Link className="navbar-brand d-inline-block" to="/">
              <h1 className="fs-3 m-0 fw-bold">
                Shop<span className="text-primary">Easy</span>
              </h1>
            </Link>
            <p className="small mb-0 mt-2">
              Your one-stop shop for everything you need!
            </p>
          </div>

          <div className="col-md-4 text-md-end">
            <p className="small mb-0">
              &copy; 2025 ShopEasy. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
