import { useContext, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/headers/Header";
import Footer from "../components/Footer";
import { CartContext } from "../contexts/CartContext";
import { FavouriteContext } from "../contexts/FavouriteContext";
import useFetch from "../hooks/useFetch";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("term") || "";
  const { cartItems, addToCart } = useContext(CartContext);
  const { favourites, toggleFavourite } = useContext(FavouriteContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data, loading, error } = useFetch(`${apiUrl}/api/products`);

  // Filter products based on search term
  useEffect(() => {
    if (!data?.data?.products || !searchTerm) {
      setFilteredProducts([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = data.data.products.filter(
      (product) =>
        (product.name && product.name.toLowerCase().includes(term)) ||
        (product.brand && product.brand.toLowerCase().includes(term)) ||
        (product.category && product.category.toLowerCase().includes(term))
    );

    setFilteredProducts(results);
  }, [data, searchTerm]);

  const handleAddToCart = (product, productId) => {
    const isProductAlreadyExist = cartItems.some(
      (item) => item._id === productId
    );
    if (!isProductAlreadyExist) {
      addToCart(product);
    }
  };

  const handleToggleFavourite = (product) => {
    toggleFavourite(product);
  };

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">
            Search Results for "{searchTerm}"
            <span className="badge bg-secondary ms-2">
              {filteredProducts.length}
            </span>
          </h5>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center my-5 py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Searching products...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error.message}
          </div>
        )}

        {/* Empty results */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center my-5 py-5">
            <i className="bi bi-search display-1 text-muted"></i>
            <h5 className="mt-3">No products found</h5>
            <p className="text-muted">
              Try searching with different keywords or browse our products.
            </p>
            <Link to="/products" className="btn btn-primary mt-2">
              Browse All Products
            </Link>
          </div>
        )}

        {/* Products grid */}
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
            >
              <div className="card h-100 product-card shadow-sm border-0 position-relative">
                <div className="position-absolute end-0 top-0 m-2 z-index-1">
                  <button
                    onClick={() => handleToggleFavourite(product)}
                    className="btn btn-light rounded-circle p-1"
                    aria-label="Add to favorites"
                  >
                    <i
                      className={`bi ${
                        favourites.some(
                          (favourite) => favourite._id === product._id
                        )
                          ? "bi-heart-fill text-danger"
                          : "bi-heart"
                      }`}
                    ></i>
                  </button>
                </div>
                <div
                  className="card-img-top overflow-hidden"
                  style={{ height: "180px" }}
                >
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.imageUrl}
                      className="img-fluid w-100 h-100 object-fit-cover"
                      alt={product.name}
                    />
                  </Link>
                </div>
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-light text-dark small">
                      {product.category}
                    </span>
                    {product.brand && (
                      <span className="badge bg-secondary text-white small">
                        {product.brand}
                      </span>
                    )}
                  </div>
                  <div className="text-warning small">
                    {[...Array(Math.floor(product.rating))].map((_, i) => (
                      <i key={i} className="bi bi-star-fill"></i>
                    ))}
                    {product.rating % 1 !== 0 && (
                      <i className="bi bi-star-half"></i>
                    )}
                    <span className="ms-1 text-muted">({product.rating})</span>
                  </div>
                  <h6 className="card-title mb-1 text-truncate">
                    {product.name}
                  </h6>
                  <p className="fw-bold mb-0">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
                <div className="card-footer bg-white border-0 p-3 pt-0">
                  <button
                    className="btn btn-sm btn-primary w-100"
                    onClick={() => handleAddToCart(product, product._id)}
                  >
                    <i className="bi bi-cart-plus me-1"></i>
                    {cartItems.some((item) => item._id === product._id) ? (
                      <Link
                        to="/cart"
                        className="text-white text-decoration-none"
                      >
                        Go to Cart
                      </Link>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchResults;
