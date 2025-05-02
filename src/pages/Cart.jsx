import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/headers/Header";
import { CartContext } from "../contexts/CartContext";
import { FavouriteContext } from "../contexts/FavouriteContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const { favourites, toggleFavourite } = useContext(FavouriteContext);
  const [quantity, setQuantity] = useState(1);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * quantity;
  }, 0);

  const handleMoveToWishList = (item) => {
    console.log(item);
    toggleFavourite(item);
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="mb-4">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          // Empty cart display
          <div className="text-center py-5">
            <div className="display-1 text-muted mb-4">
              <i className="bi bi-cart"></i>
            </div>
            <h3>Your cart is empty</h3>
            <p className="text-muted">
              Start shopping to add products to your cart!
            </p>
            <Link to="/products" className="btn btn-primary mt-3">
              Browse Products
            </Link>
          </div>
        ) : (
          // Cart with items
          <div className="row">
            {/* Cart Items List */}
            <div className="col-lg-8">
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-borderless align-middle">
                      <thead className="bg-light">
                        <tr>
                          <th scope="col">Product</th>
                          <th scope="col">Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Total</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item._id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="img-thumbnail me-3"
                                  style={{
                                    width: "80px",
                                    height: "80px",
                                    objectFit: "cover",
                                  }}
                                />
                                <div>
                                  <h6 className="mb-0">{item.name}</h6>
                                  <p className="text-muted small mb-0">
                                    {item.brand} | {item.category}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>&#8377;{item.price.toFixed(2)}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() =>
                                    setQuantity((quant) =>
                                      quant >= 2 ? quant - 1 : quant
                                    )
                                  }
                                >
                                  -
                                </button>
                                <span className="mx-2">{quantity}</span>
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() =>
                                    setQuantity((quant) => quant + 1)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td>&#8377;{(item.price * quantity).toFixed(2)}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => removeFromCart(item._id)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                            <td>
                              {favourites.some(
                                (favourite) => favourite._id === item._id
                              ) ? (
                                <Link
                                  to="/favorites"
                                  className="btn btn-primary"
                                >
                                  Go to Wishlist
                                </Link>
                              ) : (
                                <Link
                                  to="/favorites"
                                  className="btn btn-primary"
                                  onClick={() => handleMoveToWishList(item)}
                                >
                                  Move to Wishlist
                                </Link>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <Link to="/products" className="btn btn-outline-primary">
                  <i className="bi bi-arrow-left me-2"></i>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-lg-4">
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-transparent">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <span>Subtotal</span>
                    <span>&#8377;{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3 fw-bold">
                    <span>Total</span>
                    <span>&#8377;{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="mt-4">
                    <Link
                      to="/checkout/address"
                      className="btn btn-primary w-100"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
