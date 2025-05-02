function CategoryFilter({
  uniqueCategories,
  selectedCategory,
  handleFilterCheckbox,
}) {
  return (
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
          <label className="form-check-label small" htmlFor={category}>
            {category}
          </label>
        </div>
      ))}
    </div>
  );
}

export default CategoryFilter;
