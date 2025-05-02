import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5 mb-4 mb-md-0">
            <Link className="navbar-brand d-inline-block mb-2" to="/">
              <h1 className="fs-3 m-0 fw-bold">
                Shop<span className="text-primary">Easy</span>
              </h1>
            </Link>
            <p className="text-white fs-6 mb-0">
              Shop with ease - Your premier destination for quality products.
            </p>
          </div>

          <div className="col-md-5 offset-md-2">
            <h6 className="text-primary fw-bold mb-3">Shop</h6>
            <div className="row">
              <div className="col-6">
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <Link
                      to="/products"
                      className="text-decoration-none text-white"
                    >
                      All Products
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/products/electronics"
                      className="text-decoration-none text-white"
                    >
                      Electronics
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-6">
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <Link
                      to="/products/accessories"
                      className="text-decoration-none text-white"
                    >
                      Accessories
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/products/home"
                      className="text-decoration-none text-white"
                    >
                      Home & Living
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-3 opacity-25" />
        <div className="text-center text-white small">
          &copy; {currentYear} ShopEasy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
