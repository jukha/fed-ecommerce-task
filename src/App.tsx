import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Products from "./components/shop/products/Products";
import Product from "./components/shop/products/Product";
import PageLayout from "./pages/PageLayout";
import Cart from "./components/shop/cart/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <Router>
      <ToastContainer autoClose={3000} bodyClassName="font-poppins" />
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<Navigate replace to="/products" />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
