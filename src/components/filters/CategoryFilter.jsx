import useFetch from "../../hooks/useFetch";

function CategoryFilter() {
  const { data, loading, error } = useFetch(
    "https://shop-easy-apis.vercel.app/api/categories"
  );
  const AllCategories = data?.data?.categories.map(
    (product) => product.category
  );
  const uniqueCategories = [...new Set(AllCategories)];

  const handleCheckbox = (event) => {
    const { checked, value } = event.target;
  };
  return (
    <div className="">
      <h4>Category</h4>
      {uniqueCategories.map((category) => {
        return (
          <label key={category} htmlFor={category}>
            <input
              type="checkbox"
              name="category"
              value={category}
              id={category}
              onChange={handleCheckbox}
            />{" "}
            {category}
            <br />
          </label>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
