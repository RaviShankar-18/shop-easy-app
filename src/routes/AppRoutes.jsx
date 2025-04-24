import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductListing from "../pages/ProductListing";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import SearchResults from "../pages/SearchResults";
import ProductDetail from "../pages/ProductDetail";
import Address from "../pages/Address";
import OrderSummary from "../pages/OrderSummary";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/products/:category" element={<ProductListing />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/favorites" element={<Wishlist />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/checkout/address" element={<Address />} />
      <Route path="/checkout/summary" element={<OrderSummary />} />
    </Routes>
  );
}

export default AppRoutes;
