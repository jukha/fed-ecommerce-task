import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectTotalCartQuantity } from "../shop/cart/cartSlice";

function Header() {
  const totalItemsInCart = useSelector(selectTotalCartQuantity);
  return (
    <header className="p-8 bg-black mb-10">
      <nav className="flex justify-between items-center">
        <Link to="/">
          <i className="pi pi-amazon text-white text-5xl"></i>
        </Link>
        <Link to="/cart" className="relative">
          <i className="pi pi-shopping-cart text-white text-5xl"></i>
          <span className="bg-white text-black w-6 h-6 font-semibold rounded-full justify-center inline-flex absolute top-0 right-0">
            {totalItemsInCart}
          </span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
