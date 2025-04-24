import { useContext, useState, useEffect } from "react";
import { AddressContext } from "../contexts/AddressContext";

const AddressForm = ({
  onSubmitSuccess,
  initialData = null,
  isEditing = false,
  editIndex = null,
}) => {
  const { addAddress, updateAddress } = useContext(AddressContext);

  const [customerAddress, setCustomerAddress] = useState({
    name: "",
    mobileNumber: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    if (isEditing && initialData) {
      setCustomerAddress(initialData);
    }
  }, [isEditing, initialData]);

  const handleCustomerDetails = (e) => {
    const { name, value } = e.target;
    setCustomerAddress((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmittedAddress = (e) => {
    e.preventDefault();

    if (isEditing && editIndex !== null) {
      updateAddress(editIndex, customerAddress);
    } else {
      addAddress(customerAddress);
    }

    onSubmitSuccess();
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">
                  {isEditing ? "Edit Address" : "Address Information"}
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmittedAddress}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      value={customerAddress.name}
                      onChange={handleCustomerDetails}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="mobileNumber" className="form-label">
                      10-digit mobile number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="mobileNumber"
                      id="mobileNumber"
                      value={customerAddress.mobileNumber}
                      onChange={handleCustomerDetails}
                      required
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="pincode" className="form-label">
                        Pincode
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="pincode"
                        id="pincode"
                        value={customerAddress.pincode}
                        onChange={handleCustomerDetails}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="locality" className="form-label">
                        Locality
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="locality"
                        id="locality"
                        value={customerAddress.locality}
                        onChange={handleCustomerDetails}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address (Area and Street)
                    </label>
                    <textarea
                      className="form-control"
                      name="address"
                      id="address"
                      value={customerAddress.address}
                      onChange={handleCustomerDetails}
                      rows="2"
                      required
                    ></textarea>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="city" className="form-label">
                        City/District/Town
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        id="city"
                        value={customerAddress.city || ""}
                        onChange={handleCustomerDetails}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        id="state"
                        value={customerAddress.state}
                        onChange={handleCustomerDetails}
                        required
                      />
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      {isEditing ? "Update Address" : "Save Address"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={onSubmitSuccess}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
