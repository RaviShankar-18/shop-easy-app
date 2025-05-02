import CategoryFilter from "./CategoryFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import RatingFilter from "./RatingFilter";
import SortByFilter from "./SortByFilter";

function FilterSidebar({
  filterVisible,
  handleClearsBtn,
  toggleFilters,
  uniqueCategories,
  selectedCategory,
  handleFilterCheckbox,
  price,
  handlePriceRange,
  selectedRating,
  handleRadioBtnRating,
  sortByPrice,
  handleSortByPriceFilter,
}) {
  return (
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
          <CategoryFilter
            uniqueCategories={uniqueCategories}
            selectedCategory={selectedCategory}
            handleFilterCheckbox={handleFilterCheckbox}
          />

          <PriceRangeFilter price={price} handlePriceRange={handlePriceRange} />

          <RatingFilter
            selectedRating={selectedRating}
            handleRadioBtnRating={handleRadioBtnRating}
          />

          <SortByFilter
            sortByPrice={sortByPrice}
            handleSortByPriceFilter={handleSortByPriceFilter}
          />

          {/* Filter Apply button - only visible on mobile */}
          <div className="d-md-none mt-4">
            <button className="btn btn-primary w-100" onClick={toggleFilters}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
