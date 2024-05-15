import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/shop/products/Products";
import Product from "./components/shop/products/Product";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<Product />} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
