import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/headers/Header";
import { CartContext } from "../contexts/CartContext";
import { FavouriteContext } from "../contexts/FavouriteContext";
import useFetch from "../hooks/useFetch";

function ProductDetail() {
  const { id } = useParams();
  const { cartItems, addToCart } = useContext(CartContext);
  const { favourites, toggleFavourite } = useContext(FavouriteContext);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const apiUrl = import.meta.env.VITE_API_URL;

  const {
    data: productData,
    loading,
    error,
  } = useFetch(`${apiUrl}/api/products/${id}`);

  const product = productData?.data?.product;

  // Fetch related products (same category)
  const { data: allProductsData } = useFetch(`${apiUrl}/api/products`);

  const relatedProducts = allProductsData?.data?.products
    ?.filter(
      (item) => item.category === product?.category && item._id !== product?._id
    )
    .slice(0, 4);

  const isInCart = cartItems.some((item) => item._id === product?._id);
  const isFavourite = favourites.some((item) => item._id === product?._id);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    if (product && !isInCart) {
      // Add product with quantity
      addToCart({ ...product, quantity });
    }
  };

  const handleToggleFavourite = () => {
    if (product) {
      toggleFavourite(product);
    }
  };

  useEffect(() => {
    // Reset scroll position when product changes
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <Header />
      <div className="container py-5">
        {loading && (
          <div className="text-center my-5 py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading product details...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error.message || "Failed to load product details"}
          </div>
        )}

        {product && !loading && (
          <>
            <nav aria-label="breadcrumb" className="mb-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-decoration-none">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link
                    to={`/products/${product.category}`}
                    className="text-decoration-none"
                  >
                    {product.category}
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {product.name}
                </li>
              </ol>
            </nav>

            <div className="row g-4">
              <div className="col-lg-5 mb-4 mb-lg-0">
                <div className="card border-0 shadow-sm">
                  <div className="card-img-top p-3 text-center">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="img-fluid"
                      style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="mb-3">
                      <span className="badge bg-light text-dark me-2">
                        {product.category}
                      </span>
                      <span className="text-warning">
                        {[...Array(Math.floor(product.rating))].map((_, i) => (
                          <i key={i} className="bi bi-star-fill"></i>
                        ))}
                        {product.rating % 1 !== 0 && (
                          <i className="bi bi-star-half"></i>
                        )}
                        <span className="ms-1 text-muted">
                          ({product.rating})
                        </span>
                      </span>
                    </div>

                    <h2 className="mb-3">{product.name}</h2>
                    <h3 className="text-primary mb-4">
                      ₹{product.price.toLocaleString()}
                    </h3>

                    <div className="mb-4">
                      <p className="mb-2 text-muted">
                        {product.description || "No description available"}
                      </p>
                    </div>

                    <div className="d-flex align-items-center mb-4">
                      <div
                        className="input-group me-3"
                        style={{ width: "130px" }}
                      >
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => handleQuantityChange(-1)}
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <input
                          type="text"
                          className="form-control text-center"
                          value={quantity}
                          readOnly
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => handleQuantityChange(1)}
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>

                      <button
                        className="btn btn-primary me-2"
                        onClick={handleAddToCart}
                      >
                        <i className="bi bi-cart-plus me-2"></i>
                        {isInCart ? (
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

                      <button
                        className="btn btn-outline-danger"
                        onClick={handleToggleFavourite}
                      >
                        <i
                          className={`bi ${
                            isFavourite ? "bi-heart-fill" : "bi-heart"
                          }`}
                        ></i>
                      </button>
                    </div>

                    <hr />

                    <div className="d-flex flex-wrap mt-3">
                      <div className="me-4 mb-3">
                        <small className="text-muted d-block">SKU</small>
                        <span>SKU-{product._id.substring(0, 8)}</span>
                      </div>
                      <div className="me-4 mb-3">
                        <small className="text-muted d-block">Category</small>
                        <span>{product.category}</span>
                      </div>
                      <div className="mb-3">
                        <small className="text-muted d-block">
                          Availability
                        </small>
                        <span className="text-success">In Stock</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm mt-4">
              <div className="card-header bg-white p-0">
                <ul className="nav nav-tabs border-0">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "description" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("description")}
                    >
                      Description
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "specifications" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("specifications")}
                    >
                      Specifications
                    </button>
                  </li>
                </ul>
              </div>
              <div className="card-body p-4">
                {activeTab === "description" && (
                  <div>
                    <h5>Product Description</h5>
                    <p>
                      {product.description ||
                        "No description available for this product."}
                    </p>
                  </div>
                )}
                {activeTab === "specifications" && (
                  <div>
                    <h5>Product Specifications</h5>
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <th style={{ width: "30%" }}>Category</th>
                          <td>{product.category}</td>
                        </tr>
                        <tr>
                          <th>Rating</th>
                          <td>{product.rating} out of 5</td>
                        </tr>
                        <tr>
                          <th>Price</th>
                          <td>₹{product.price.toLocaleString()}</td>
                        </tr>
                        <tr>
                          <th>Product ID</th>
                          <td>{product._id}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {relatedProducts && relatedProducts.length > 0 && (
              <div className="mt-5">
                <h3 className="mb-4">Related Products</h3>
                <div className="row g-4">
                  {relatedProducts.map((relatedProduct) => (
                    <div
                      key={relatedProduct._id}
                      className="col-xl-3 col-lg-3 col-md-6 col-sm-6"
                    >
                      <div className="card h-100 product-card shadow-sm border-0 position-relative">
                        <div className="position-absolute end-0 top-0 m-2 z-index-1">
                          <button
                            onClick={() => toggleFavourite(relatedProduct)}
                            className="btn btn-light rounded-circle p-1"
                            aria-label="Add to favorites"
                          >
                            <i
                              className={`bi ${
                                favourites.some(
                                  (favourite) =>
                                    favourite._id === relatedProduct._id
                                )
                                  ? "bi-heart-fill text-danger"
                                  : "bi-heart"
                              }`}
                            ></i>
                          </button>
                        </div>
                        <Link
                          to={`/product/${relatedProduct._id}`}
                          className="text-decoration-none"
                        >
                          <div
                            className="card-img-top overflow-hidden"
                            style={{ height: "180px" }}
                          >
                            <img
                              src={relatedProduct.imageUrl}
                              className="img-fluid w-100 h-100 object-fit-cover"
                              alt={relatedProduct.name}
                            />
                          </div>
                          <div className="card-body p-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="badge bg-light text-dark small">
                                {relatedProduct.category}
                              </span>
                              <div className="text-warning small">
                                {[
                                  ...Array(Math.floor(relatedProduct.rating)),
                                ].map((_, i) => (
                                  <i key={i} className="bi bi-star-fill"></i>
                                ))}
                                {relatedProduct.rating % 1 !== 0 && (
                                  <i className="bi bi-star-half"></i>
                                )}
                                <span className="ms-1 text-muted">
                                  ({relatedProduct.rating})
                                </span>
                              </div>
                            </div>
                            <h6 className="card-title mb-1 text-truncate text-dark">
                              {relatedProduct.name}
                            </h6>
                            <p className="fw-bold mb-0">
                              ₹{relatedProduct.price.toLocaleString()}
                            </p>
                          </div>
                        </Link>
                        <div className="card-footer bg-white border-0 p-3 pt-0">
                          <button
                            className="btn btn-sm btn-primary w-100"
                            onClick={() => addToCart(relatedProduct)}
                          >
                            <i className="bi bi-cart-plus me-1"></i>
                            {cartItems.some(
                              (item) => item._id === relatedProduct._id
                            ) ? (
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
            )}
          </>
        )}

        {!product && !loading && !error && (
          <div className="text-center my-5 py-5">
            <i className="bi bi-exclamation-circle display-1 text-muted"></i>
            <h4 className="mt-3">Product Not Found</h4>
            <p className="text-muted">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/" className="btn btn-primary mt-3">
              Return to Shop
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetail;
