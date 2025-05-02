// import { useContext, useState, useEffect } from "react";
// import { AddressContext } from "../contexts/AddressContext";

// const AddressForm = ({
//   onSubmitSuccess,
//   initialData = null,
//   isEditing = false,
//   editIndex = null,
// }) => {
//   const { addAddress, updateAddress } = useContext(AddressContext);

//   const [customerAddress, setCustomerAddress] = useState({
//     name: "",
//     mobileNumber: "",
//     pincode: "",
//     locality: "",
//     address: "",
//     city: "",
//     state: "",
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (isEditing && initialData) {
//       setCustomerAddress(initialData);
//     }
//   }, [isEditing, initialData]);

//   const handleCustomerDetails = (e) => {
//     const { name, value } = e.target;
//     setCustomerAddress((prevState) => {
//       return { ...prevState, [name]: value };
//     });
//   };

//   const validateName = (e) => {
//     const { name, value } = e.target;
//     const trimmedValue = value.trim();

//     if (trimmedValue.length < 2) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "Name must be at least 2 characters long.",
//       }));
//     } else {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "",
//       }));
//     }
//   };

//   const handleSubmittedAddress = (e) => {
//     e.preventDefault();

//     if (isEditing && editIndex !== null) {
//       updateAddress(editIndex, customerAddress);
//     } else {
//       addAddress(customerAddress);
//     }

//     onSubmitSuccess();
//   };

//   return (
//     <>
//       <div className="container mt-4">
//         <div className="row justify-content-center">
//           <div className="col-md-8 col-lg-6">
//             <div className="card shadow">
//               <div className="card-header bg-primary text-white">
//                 <h4 className="mb-0">
//                   {isEditing ? "Edit Address" : "Address Information"}
//                 </h4>
//               </div>
//               <div className="card-body">
//                 <form onSubmit={handleSubmittedAddress}>
//                   <div className="mb-3">
//                     <label htmlFor="name" className="form-label">
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="name"
//                       id="name"
//                       placeholder="e.g. Jake Ryan"
//                       value={customerAddress.name || ""}
//                       onChange={handleCustomerDetails}
//                       onBlur={validateName}
//                       required
//                     />
//                     {errors.name && (
//                       <p style={{ color: "red", fontSize: "0.875rem" }}>
//                         {errors.name}
//                       </p>
//                     )}
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="mobileNumber" className="form-label">
//                       10-digit mobile number
//                     </label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="mobileNumber"
//                       id="mobileNumber"
//                       placeholder="123-456-7890"
//                       value={customerAddress.mobileNumber}
//                       onChange={handleCustomerDetails}
//                       required
//                     />
//                   </div>

//                   <div className="row mb-3">
//                     <div className="col-md-6">
//                       <label htmlFor="pincode" className="form-label">
//                         Pincode
//                       </label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         name="pincode"
//                         id="pincode"
//                         placeholder="847222"
//                         value={customerAddress.pincode}
//                         onChange={handleCustomerDetails}
//                         required
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label htmlFor="locality" className="form-label">
//                         Locality
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="locality"
//                         id="locality"
//                         placeholder="e.g. Behta"
//                         value={customerAddress.locality}
//                         onChange={handleCustomerDetails}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="address" className="form-label">
//                       Address (Area and Street)
//                     </label>
//                     <textarea
//                       className="form-control"
//                       name="address"
//                       id="address"
//                       placeholder="e.g.  Behta,Benipatti near Ambedkar Chowk"
//                       value={customerAddress.address}
//                       onChange={handleCustomerDetails}
//                       rows="2"
//                       required
//                     ></textarea>
//                   </div>

//                   <div className="row mb-3">
//                     <div className="col-md-6">
//                       <label htmlFor="city" className="form-label">
//                         City
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="city"
//                         id="city"
//                         placeholder="e.g. Benipatti"
//                         value={customerAddress.city || ""}
//                         onChange={handleCustomerDetails}
//                         required
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label htmlFor="state" className="form-label">
//                         State
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="state"
//                         id="state"
//                         placeholder="e.g. Bihar"
//                         value={customerAddress.state}
//                         onChange={handleCustomerDetails}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="d-grid gap-2">
//                     <button type="submit" className="btn btn-primary">
//                       {isEditing ? "Update Address" : "Save Address"}
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-outline-secondary"
//                       onClick={onSubmitSuccess}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddressForm;

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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && initialData) {
      setCustomerAddress({
        ...initialData,
        name: initialData.name || "",
        mobileNumber: initialData.mobileNumber || "",
        pincode: initialData.pincode || "",
        locality: initialData.locality || "",
        address: initialData.address || "",
        city: initialData.city || "",
        state: initialData.state || "",
      });
    }
  }, [isEditing, initialData]);

  const handleCustomerDetails = (e) => {
    const { name, value } = e.target;
    setCustomerAddress((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = (name, value) => {
    let error = "";
    const trimmed = value.trim();

    switch (name) {
      case "name":
        if (trimmed.length < 2) {
          error = "Name must be at least 2 characters long.";
        }
        break;
      case "mobileNumber":
        if (trimmed.length !== 10 || !/^\d+$/.test(trimmed)) {
          error = "Mobile number must be exactly 10 digits.";
        }
        break;
      case "pincode":
        if (trimmed.length !== 6 || !/^\d+$/.test(trimmed)) {
          error = "Pincode must be exactly 6 digits.";
        }
        break;
      default:
        if (trimmed === "") {
          error = "This field is required.";
        }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const isFormValid = () => {
    const newErrors = {};
    Object.entries(customerAddress).forEach(([key, value]) => {
      validateField(key, value);
      if (value.trim() === "") {
        newErrors[key] = "This field is required.";
      }
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmittedAddress = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    if (isEditing && editIndex !== null) {
      updateAddress(editIndex, customerAddress);
    } else {
      addAddress(customerAddress);
    }
    onSubmitSuccess();
  };

  return (
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
                {[
                  {
                    name: "name",
                    label: "Name",
                    type: "text",
                    placeholder: "e.g. Jake Ryan",
                  },
                  {
                    name: "mobileNumber",
                    label: "10-digit mobile number",
                    type: "text",
                    placeholder: "1234567890",
                  },
                  {
                    name: "pincode",
                    label: "Pincode",
                    type: "text",
                    placeholder: "847222",
                  },
                  {
                    name: "locality",
                    label: "Locality",
                    type: "text",
                    placeholder: "e.g. Behta",
                  },
                  {
                    name: "address",
                    label: "Address (Area and Street)",
                    type: "textarea",
                    placeholder: "e.g. Behta, Benipatti near Ambedkar Chowk",
                  },
                  {
                    name: "city",
                    label: "City",
                    type: "text",
                    placeholder: "e.g. Benipatti",
                  },
                  {
                    name: "state",
                    label: "State",
                    type: "text",
                    placeholder: "e.g. Bihar",
                  },
                ].map((field) => (
                  <div className="mb-3" key={field.name}>
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        className="form-control"
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={customerAddress[field.name] || ""}
                        onChange={handleCustomerDetails}
                        onBlur={handleBlur}
                        rows="2"
                      ></textarea>
                    ) : (
                      <input
                        type={field.type}
                        className="form-control"
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={customerAddress[field.name] || ""}
                        onChange={handleCustomerDetails}
                        onBlur={handleBlur}
                      />
                    )}
                    {errors[field.name] && (
                      <p style={{ color: "red", fontSize: "0.875rem" }}>
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}

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
  );
};

export default AddressForm;
