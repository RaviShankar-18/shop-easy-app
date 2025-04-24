import { createContext, useState } from "react";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState([
    {
      name: "Ravi Shankar Kumar",
      mobileNumber: "9354419407",
      pincode: "847223",
      locality: "Benipatti",
      address: "Behta,Benipatti near ambedkar chowk",
      state: "Bihar",
    },
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const addAddress = (customerAddress) => {
    setAddress((prevAddress) => [...prevAddress, customerAddress]);
  };

  const selectAddress = (id) => {
    setSelectedAddressId(id);
  };

  const updateAddress = (index, updatedAddress) => {
    setAddress((prevAddresses) => {
      const newAddresses = [...prevAddresses];
      newAddresses[index] = updatedAddress;
      return newAddresses;
    });
  };

  return (
    <AddressContext.Provider
      value={{
        address,
        addAddress,
        updateAddress,
        selectedAddressId,
        selectAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
