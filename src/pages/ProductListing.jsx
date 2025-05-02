import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/headers/Header";
import { CartContext } from "../contexts/CartContext";
import useFetch from "../hooks/useFetch";
import { FavouriteContext } from "../contexts/FavouriteContext";

function ProductListing() {
  const { cartItems, addToCart } = useContext(CartContext);
  const { favourites, toggleFavourite } = useContext(FavouriteContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { category: paramCategory } = useParams();
  const { data, loading, error } = useFetch(`${apiUrl}/api/products`);

  const [selectedCategory, setSelectedCategory] = useState(
    paramCategory ? [paramCategory] : []
  );
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortByPrice, setSortByPrice] = useState(null);
  const [price, setPrice] = useState(1000);
  const [filterVisible, setFilterVisible] = useState(false);

  const AllCategories = data?.data?.products.map((product) => product.category);
  const uniqueCategories = [...new Set(AllCategories)];

  const handleFilterCheckbox = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedCategory((prevValue) => [...prevValue, value]);
    } else {
      setSelectedCategory((prevValue) =>
        prevValue.filter((val) => val !== value)
      );
    }
  };

  const filterdData =
    data?.data?.products?.filter((product) => {
      const categoryData =
        selectedCategory.length === 0 ||
        selectedCategory.includes(product.category);
      const ratingData = !selectedRating || product.rating >= selectedRating;
      return categoryData && ratingData;
    }) || [];

  const sortedData = sortByPrice
    ? [...filterdData].sort((a, b) => {
        return sortByPrice === "lowToHigh"
          ? a.price - b.price
          : b.price - a.price;
      })
    : filterdData;

  const priceRangeData = price
    ? [...sortedData].filter((product) => product.price <= price)
    : sortedData;

  const handleRadioBtnRating = (event) => {
    const { value } = event.target;
    setSelectedRating(Number(value));
  };

  const handleSortByPriceFilter = (event) => {
    const { value } = event.target;
    setSortByPrice(value);
  };

  const handlePriceRange = (event) => {
    const newPrice = event.target.value;
    setPrice(Number(newPrice));
  };

  const handleClearsBtn = () => {
    setSelectedCategory([]);
    setPrice(1000);
    setSelectedRating(null);
    setSortByPrice(null);
  };

  const handleAddToCart = (product, productId) => {
    const isProductAlreadyExist = [...cartItems].find(
      (product) => product._id === productId
    );
    if (!isProductAlreadyExist) {
      addToCart(product);
    }
  };

  const handleToggleFavourite = (product) => {
    // Check if the product is already in the favourites
    const isFavourite = favourites.some(
      (favourite) => favourite._id === product._id
    );

    if (isFavourite) {
      // Remove from favourites
      toggleFavourite(product); // This should remove it from favourites
    } else {
      // Add to favourites
      toggleFavourite(product); // This should add it to favourites
    }
  };

  const toggleFilters = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <>
      <Header />
      <div className="container py-3 py-md-5">
        <div className="d-md-none mb-3">
          <button
            className="btn btn-outline-primary w-100"
            onClick={toggleFilters}
          >
            <i className="bi bi-funnel me-2"></i>
            {filterVisible ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="row gx-4">
          {/* Filter Sidebar */}
          <div
            className={`col-lg-3 col-md-4 mb-4 mb-md-0 ${
              filterVisible ? "d-block" : "d-none d-md-block"
            }`}
          >
            <div
              className="card shadow-sm border-0 sticky-md-top"
              style={{ top: "20px" }}
            >
              <div className="card-header bg-white py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 fw-bold">Filters</h6>
                  <button
                    className="btn btn-sm text-primary p-0"
                    onClick={handleClearsBtn}
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="card-body p-3">
                {/* Category Filter */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-2 fs-7">Category</h6>
                  {uniqueCategories.map((category) => (
                    <div className="form-check mb-1" key={category}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={category}
                        name={category}
                        value={category}
                        checked={selectedCategory.includes(category)}
                        onChange={handleFilterCheckbox}
                      />
                      <label
                        className="form-check-label small"
                        htmlFor={category}
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Price Range */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-2 fs-7">Price Range</h6>
                  <input
                    type="range"
                    className="form-range mb-2"
                    id="price"
                    name="price"
                    value={price}
                    min="100"
                    max="1000"
                    step="50"
                    onChange={handlePriceRange}
                  />
                  <div className="d-flex justify-content-between small text-muted">
                    <span>₹100</span>
                    <span>₹{price}</span>
                    <span>₹1000</span>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-2 fs-7">Rating</h6>
                  {[4, 3, 2, 1].map((rating) => (
                    <div className="form-check mb-1" key={rating}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="rating"
                        id={`rating${rating}`}
                        value={rating}
                        checked={selectedRating === rating}
                        onChange={handleRadioBtnRating}
                      />
                      <label
                        className="form-check-label small"
                        htmlFor={`rating${rating}`}
                      >
                        {rating}+{" "}
                        <span className="text-warning">
                          {[...Array(rating)].map((_, i) => (
                            <i key={i} className="bi bi-star-fill small"></i>
                          ))}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                {/* Sort By */}
                <div>
                  <h6 className="fw-bold mb-2 fs-7">Sort by</h6>
                  <div className="form-check mb-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sortByPrice"
                      id="lowToHigh"
                      value="lowToHigh"
                      checked={sortByPrice === "lowToHigh"}
                      onChange={handleSortByPriceFilter}
                    />
                    <label
                      className="form-check-label small"
                      htmlFor="lowToHigh"
                    >
                      Price - Low to High
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sortByPrice"
                      id="highToLow"
                      value="highToLow"
                      checked={sortByPrice === "highToLow"}
                      onChange={handleSortByPriceFilter}
                    />
                    <label
                      className="form-check-label small"
                      htmlFor="highToLow"
                    >
                      Price - High to Low
                    </label>
                  </div>
                </div>

                {/* Filter Apply button - only visible on mobile */}
                <div className="d-md-none mt-4">
                  <button
                    className="btn btn-primary w-100"
                    onClick={toggleFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-lg-9 col-md-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">
                All Products{" "}
                <span className="badge bg-secondary ms-2">
                  {priceRangeData?.length || 0}
                </span>
              </h5>
            </div>

            {loading && (
              <div className="text-center my-5 py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading products...</p>
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error.message}
              </div>
            )}

            <div className="row g-3 g-md-4">
              {priceRangeData?.map((product) => (
                <div
                  key={product._id}
                  className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3"
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
                      style={{ height: "160px" }}
                    >
                      <Link
                        to={`/product/${product._id}`}
                        className="text-decoration-none"
                      >
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
                        </div>
                      </div>
                      <h6 className="card-title mb-1 text-truncate">
                        {product.name}
                      </h6>
                      <p className="fw-bold mb-0">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="card-footer bg-white border-0 p-2 p-sm-3 pt-0">
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

            {priceRangeData?.length === 0 && !loading && (
              <div className="text-center my-5 py-5">
                <i className="bi bi-search display-1 text-muted"></i>
                <h5 className="mt-3">No products found</h5>
                <p className="text-muted">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleClearsBtn}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductListing;
