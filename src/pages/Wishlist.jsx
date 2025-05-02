import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavouriteContext } from "../contexts/FavouriteContext";
import { CartContext } from "../contexts/CartContext";
import Header from "../components/headers/Header";
import Footer from "../components/Footer";

const Wishlist = () => {
  const { favourites, toggleFavourite } = useContext(FavouriteContext);
  const { cartItems, addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleRemoveFromWishlist = (product) => {
    toggleFavourite(product);
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="mb-4">Your Wishlist</h2>

        {favourites.length === 0 ? (
          <div className="text-center py-5">
            <div className="display-1 text-muted mb-4">
              <i className="bi bi-heart"></i>
            </div>
            <h3>Your wishlist is empty</h3>
            <p className="text-muted">Save items you like for later!</p>
            <Link to="/products" className="btn btn-primary mt-3">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {favourites.map((product) => (
              <div key={product._id} className="col-12">
                <div className="card mb-3 shadow-sm border-0">
                  <div className="row g-0">
                    <div className="col-md-3 col-lg-2">
                      <div style={{ height: "150px" }} className="h-100">
                        <img
                          src={product.imageUrl}
                          className="img-fluid h-100 w-100 object-fit-cover"
                          alt={product.name}
                        />
                      </div>
                    </div>
                    <div className="col-md-7 col-lg-8">
                      <div className="card-body py-3">
                        <div className="d-flex justify-content-between">
                          <h5 className="card-title mb-1">{product.name}</h5>
                          <button
                            onClick={() => handleRemoveFromWishlist(product)}
                            className="btn btn-sm btn-outline-danger"
                            aria-label="Remove from wishlist"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                        <div className="mb-2">
                          <span className="badge bg-light text-dark me-2">
                            {product.category}
                          </span>
                          <span className="text-warning small">
                            {[...Array(Math.floor(product.rating))].map(
                              (_, i) => (
                                <i key={i} className="bi bi-star-fill"></i>
                              )
                            )}
                            {product.rating % 1 !== 0 && (
                              <i className="bi bi-star-half"></i>
                            )}
                            <span className="ms-1 text-muted">
                              ({product.rating})
                            </span>
                          </span>
                        </div>
                        <p className="card-text text-muted mb-2">
                          {product.description
                            ? product.description.length > 100
                              ? `${product.description.substring(0, 100)}...`
                              : product.description
                            : "No description available"}
                        </p>
                        <p className="fw-bold fs-5 mb-0">
                          ₹{product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2 d-flex align-items-center justify-content-center border-start">
                      <div className="p-3 text-center">
                        {cartItems &&
                        cartItems.some((item) => item._id === product._id) ? (
                          <Link
                            to="/cart"
                            className="btn btn-primary text-white text-decoration-none"
                          >
                            <i className="bi bi-cart-plus me-1"></i>
                            Go to Cart
                          </Link>
                        ) : (
                          <button
                            className="btn btn-primary w-100"
                            onClick={() => handleAddToCart(product)}
                          >
                            <i className="bi bi-cart-plus me-1"></i>
                            Move to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {favourites.length > 0 && (
          <div className="d-flex justify-content-between mt-4">
            <Link to="/products" className="btn btn-outline-primary">
              <i className="bi bi-arrow-left me-2"></i>
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
