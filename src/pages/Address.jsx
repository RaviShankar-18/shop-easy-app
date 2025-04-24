// import { useContext, useState } from "react";
// import { AddressContext } from "../contexts/AddressContext";
// import AddressForm from "../components/AddressForm";

// const Address = () => {
//   const { address } = useContext(AddressContext);
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   const handleShowForm = () => {
//     setIsFormVisible(true);
//   };
//   return (
//     <>
//       <div>Delivery Address</div>
//       <div>
//         {address.length > 0 ? (
//           address.map((add, index) => {
//             return (
//               <label key={index} htmlFor="address">
//                 <input type="radio" name="address" id="address" />
//                 <h4>
//                   {add.name} {add.mobileNumber}
//                 </h4>
//                 <p>
//                   {add.locality}, {add.address}, {add.state}, - {add.pincode}
//                 </p>
//                 <button type="button" className="btn btn-primary">
//                   Deliver Here
//                 </button>
//               </label>
//             );
//           })
//         ) : (
//           <p>No address found</p>
//         )}
//       </div>
//       <div className="text-primary" onClick={handleShowForm}>
//         <i className="bi bi-plus"></i>{" "}
//         <span className="">Add a new address</span>
//       </div>
//       {isFormVisible && (
//         <AddressForm onSubmitSuccess={() => setIsFormVisible(false)} />
//       )}
//     </>
//   );
// };

// export default Address;

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AddressContext } from "../contexts/AddressContext";
import { CartContext } from "../contexts/CartContext";
import AddressForm from "../components/AddressForm";

const Address = () => {
  const { address, selectedAddressId, selectAddress } =
    useContext(AddressContext);
  const { cartItems } = useContext(CartContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  // Calculate total amount from cartItems (without useMemo)
  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.price || 0),
    0
  );

  const handleShowForm = () => {
    setIsFormVisible(true);
    // Hide edit form if it's open
    setIsEditFormVisible(false);
  };

  const handleDeliverHere = (index) => {
    selectAddress(index);
    navigate("/checkout/summary");
  };

  const handleAddressRadioBtn = (index) => {
    selectAddress(index);
  };

  const handleAddressEditBtn = (addressData, index) => {
    // Set the address data to edit and its index
    setAddressToEdit(addressData);
    setEditIndex(index);
    setIsEditFormVisible(true);
    // Hide add form if it's open
    setIsFormVisible(false);
  };

  // Free delivery for all items
  const deliveryCharge = 0;
  const totalPayable = totalAmount + deliveryCharge;

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center fw-bold">Checkout</h2>

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
              {address.length > 0 ? (
                <div className="address-list">
                  {address.map((add, index) => (
                    <div
                      key={index}
                      className="address-item p-3 mb-3 border rounded hover-shadow"
                    >
                      <div className="d-flex align-items-center mb-2">
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="addressSelection"
                            id={`address-${index}`}
                            onChange={() => handleAddressRadioBtn(index)}
                            checked={selectedAddressId === index}
                          />
                          <label
                            className="form-check-label ms-2 fw-bold"
                            htmlFor={`address-${index}`}
                          >
                            {add.name}
                          </label>
                        </div>
                      </div>

                      <div className="ms-4">
                        <div className="mb-2">
                          <i className="bi bi-telephone me-2"></i>
                          {add.mobileNumber}
                        </div>
                        <p className="text-muted mb-2">
                          {add.locality}, {add.address},<br />
                          {add.state} - {add.pincode}
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleDeliverHere(index)}
                        >
                          Deliver Here
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary ms-2"
                          onClick={() => handleAddressEditBtn(add, index)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="alert alert-info">
                  <i className="bi bi-info-circle me-2"></i>
                  No addresses found. Please add a new address.
                </div>
              )}

              <div
                className="d-flex align-items-center mt-3 p-3 border border-dashed rounded text-primary"
                onClick={handleShowForm}
                style={{ cursor: "pointer" }}
              >
                <i className="bi bi-plus-circle me-2"></i>
                <span>Add a new address</span>
              </div>
            </div>
          </div>

          {isFormVisible && (
            <AddressForm onSubmitSuccess={() => setIsFormVisible(false)} />
          )}

          {isEditFormVisible && (
            <AddressForm
              onSubmitSuccess={() => setIsEditFormVisible(false)}
              initialData={addressToEdit}
              isEditing={true}
              editIndex={editIndex}
            />
          )}
        </div>

        {/* Price Details Section - aligned with delivery section */}
        {cartItems.length > 0 && (
          <div className="col-lg-4">
            <div className="card shadow-sm">
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
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total Payable</span>
                  <span>₹{totalPayable.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;
