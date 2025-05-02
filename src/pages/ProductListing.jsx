import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/headers/Header";
import { CartContext } from "../contexts/CartContext";
import useFetch from "../hooks/useFetch";
import { FavouriteContext } from "../contexts/FavouriteContext";
import FilterSidebar from "../components/filters/FilterSidebar";
import ProductGrid from "../components/ProductGrid";
import FilterToggleButton from "../components/filters/FilterToggleButton";

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
    const isFavourite = favourites.some(
      (favourite) => favourite._id === product._id
    );

    if (isFavourite) {
      toggleFavourite(product); // This should remove it from favourites
    } else {
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
        <FilterToggleButton
          filterVisible={filterVisible}
          toggleFilters={toggleFilters}
        />

        <div className="row gx-4">
          <FilterSidebar
            filterVisible={filterVisible}
            handleClearsBtn={handleClearsBtn}
            toggleFilters={toggleFilters}
            uniqueCategories={uniqueCategories}
            selectedCategory={selectedCategory}
            handleFilterCheckbox={handleFilterCheckbox}
            price={price}
            handlePriceRange={handlePriceRange}
            selectedRating={selectedRating}
            handleRadioBtnRating={handleRadioBtnRating}
            sortByPrice={sortByPrice}
            handleSortByPriceFilter={handleSortByPriceFilter}
          />

          <ProductGrid
            priceRangeData={priceRangeData}
            loading={loading}
            error={error}
            cartItems={cartItems}
            handleAddToCart={handleAddToCart}
            handleToggleFavourite={handleToggleFavourite}
            favourites={favourites}
            handleClearsBtn={handleClearsBtn}
          />
        </div>
      </div>
    </>
  );
}

export default ProductListing;
