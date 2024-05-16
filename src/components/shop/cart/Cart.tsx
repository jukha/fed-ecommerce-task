import { useDispatch, useSelector } from "react-redux";
import { deleteItem, selectCart, selectTotalCartPrice } from "./cartSlice";
import Product from "../products/Product";
import CartItem from "./CartItem";

function Cart() {
  const cart = useSelector(selectCart);
  const cartTotalPrice = useSelector(selectTotalCartPrice);
  const dispatch = useDispatch();

  return (
    <div>
      {cart.length === 0 ? (
        <h5 className="text-center">
          Your cart is empty. Start shopping to add items!
        </h5>
      ) : (
        <div className="flex items-start gap-10">
          <div className="w-full">
            {cart.map((product, i) => (
              <CartItem product={product} key={i} />
            ))}
          </div>
          <h6 className="rounded-lg w-full max-w-xl border-black text-center p-8 text-3xl font-semibold border-2 border-dotted">
            Total<br />
            ${cartTotalPrice}
          </h6>
        </div>
      )}
    </div>
  );
}

export default Cart;
