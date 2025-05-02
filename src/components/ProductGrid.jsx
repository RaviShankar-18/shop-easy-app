import ProductCard from "./ProductCard";

function ProductGrid({
  priceRangeData,
  loading,
  error,
  cartItems,
  handleAddToCart,
  handleToggleFavourite,
  favourites,
  handleClearsBtn,
}) {
  return (
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
            <ProductCard
              product={product}
              cartItems={cartItems}
              handleAddToCart={handleAddToCart}
              handleToggleFavourite={handleToggleFavourite}
              favourites={favourites}
            />
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
          <button className="btn btn-outline-primary" onClick={handleClearsBtn}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductGrid;
