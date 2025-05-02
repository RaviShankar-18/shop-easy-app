function SortByFilter({ sortByPrice, handleSortByPriceFilter }) {
  return (
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
        <label className="form-check-label small" htmlFor="lowToHigh">
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
        <label className="form-check-label small" htmlFor="highToLow">
          Price - High to Low
        </label>
      </div>
    </div>
  );
}

export default SortByFilter;
