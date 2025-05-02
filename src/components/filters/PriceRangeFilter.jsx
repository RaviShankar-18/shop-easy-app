function PriceRangeFilter({ price, handlePriceRange }) {
  return (
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
  );
}

export default PriceRangeFilter;
