import { Link } from "react-router-dom";

function ProductCard({
  product,
  cartItems,
  handleAddToCart,
  handleToggleFavourite,
  favourites,
}) {
  return (
    <div className="card h-100 product-card shadow-sm border-0 position-relative">
      <div className="position-absolute end-0 top-0 m-2 z-index-1">
        <button
          onClick={() => handleToggleFavourite(product)}
          className="btn btn-light rounded-circle p-1"
          aria-label="Add to favorites"
        >
          <i
            className={`bi ${
              favourites.some((favourite) => favourite._id === product._id)
                ? "bi-heart-fill text-danger"
                : "bi-heart"
            }`}
          ></i>
        </button>
      </div>
      <div className="card-img-top overflow-hidden" style={{ height: "160px" }}>
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <img
            src={product.imageUrl}
            className="img-fluid w-100 h-100 object-fit-cover"
            alt={product.name}
            loading="lazy"
          />
        </Link>
      </div>
      <div className="card-body p-2 p-sm-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-light text-dark small">
            {product.category}
          </span>
          <div className="text-warning small">
            {[...Array(Math.floor(product.rating))].map((_, i) => (
              <i key={i} className="bi bi-star-fill"></i>
            ))}
            {product.rating % 1 !== 0 && <i className="bi bi-star-half"></i>}
            <span className="ms-1 text-muted">({product.rating})</span>
          </div>
        </div>
        <h6 className="card-title mb-1 text-truncate">{product.name}</h6>
        <p className="fw-bold mb-0">₹{product.price.toLocaleString()}</p>
      </div>
      <div className="card-footer bg-white border-0 p-2 p-sm-3 pt-0">
        <button
          className="btn btn-sm btn-primary w-100"
          onClick={() => handleAddToCart(product, product._id)}
        >
          <i className="bi bi-cart-plus me-1"></i>
          {cartItems.some((item) => item._id === product._id) ? (
            <Link to="/cart" className="text-white text-decoration-none">
              Go to Cart
            </Link>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
