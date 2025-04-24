import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { AddressContext } from "../contexts/AddressContext";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { address, selectedAddressId } = useContext(AddressContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();
  console.log("clearCart", clearCart);
  // Add a check for selectedAddressId validity
  const selectedAddress =
    selectedAddressId !== null && selectedAddressId !== undefined
      ? address[selectedAddressId]
      : null;

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );

  const deliveryCharge = 0;
  const totalPayable = totalAmount + deliveryCharge;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="mb-4">
            <i
              className="bi bi-cart-x"
              style={{ fontSize: "5rem", color: "#ccc" }}
            ></i>
          </div>
          <h2 className="mb-3">Your Cart is Empty</h2>
          <p className="text-muted mb-4">
            Add items to your cart to proceed with checkout.
          </p>
          <a href="/" className="btn btn-primary px-4">
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  // Redirect if no address selected
  if (!selectedAddress && !orderPlaced) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          <h4>No delivery address selected</h4>
          <p>Please select a delivery address before proceeding to checkout.</p>
          <button
            className="btn btn-primary mt-2"
            onClick={() => navigate("/checkout/address")}
          >
            Select Address
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {orderPlaced ? (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow text-center p-5 mb-4">
              <div className="mb-4">
                <div className="bg-success bg-opacity-10 mx-auto rounded-circle p-3 d-inline-block">
                  <i
                    className="bi bi-check-circle-fill text-success"
                    style={{ fontSize: "4rem" }}
                  ></i>
                </div>
              </div>
              <h2 className="mb-3 fw-bold">Order Placed Successfully!</h2>
              <p className="text-muted mb-4">
                Thank you for your purchase. Your order has been received and
                will be processed shortly.
              </p>
              <a href="/" className="btn btn-primary btn-lg px-4">
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="mb-4 text-center fw-bold">Order Summary</h2>
          <div className="row">
            <div className="col-lg-8">
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-geo-alt me-2"></i>
                    Delivery Address
                  </h5>
                </div>
                <div className="card-body p-4">
                  <h6 className="fw-bold">{selectedAddress.name}</h6>
                  <p className="mb-1">
                    <i className="bi bi-telephone me-2 text-muted"></i>
                    {selectedAddress.mobileNumber}
                  </p>
                  <p className="mb-0 text-muted">
                    {selectedAddress.address}, {selectedAddress.locality},
                    <br />
                    {selectedAddress.state} - {selectedAddress.pincode}
                  </p>
                </div>
              </div>

              <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-cart me-2"></i>
                    Order Items
                  </h5>
                </div>
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush">
                    {cartItems.map((item, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center px-4 py-3"
                      >
                        <div className="d-flex align-items-center">
                          {item.image && (
                            <div className="me-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "cover",
                                }}
                                className="rounded"
                              />
                            </div>
                          )}
                          <div>
                            <h6 className="mb-0">{item.name}</h6>
                            <small className="text-muted">
                              Qty: {item.quantity || 1}
                            </small>
                          </div>
                        </div>
                        <div className="fw-bold">
                          ₹
                          {((item.price || 0) * (item.quantity || 1)).toFixed(
                            2
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div
                className="card shadow-sm mb-4 sticky-top"
                style={{ top: "20px" }}
              >
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-receipt me-2"></i>
                    Price Details
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <span>Price ({cartItems.length} items)</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Delivery Charges</span>
                    <span className="text-success">Free</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold mb-3">
                    <span>Total Payable</span>
                    <span>₹{totalPayable.toFixed(2)}</span>
                  </div>

                  <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
