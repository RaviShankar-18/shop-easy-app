function FilterToggleButton({ filterVisible, toggleFilters }) {
  return (
    <div className="d-md-none mb-3">
      <button className="btn btn-outline-primary w-100" onClick={toggleFilters}>
        <i className="bi bi-funnel me-2"></i>
        {filterVisible ? "Hide Filters" : "Show Filters"}
      </button>
    </div>
  );
}

export default FilterToggleButton;
