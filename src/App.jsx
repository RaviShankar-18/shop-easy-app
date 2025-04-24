import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { FavouriteProvider } from "./contexts/FavouriteContext";
import { AddressProvider } from "./contexts/AddressContext";

function App() {
  console.log("App loaded");
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <FavouriteProvider>
            <AddressProvider>
              <AppRoutes />
            </AddressProvider>
          </FavouriteProvider>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
