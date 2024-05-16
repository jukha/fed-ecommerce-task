import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
  selectCurrentQuantityById,
} from "./cartSlice";
import { Product as ProductType } from "../../../types/Product";

function CartItem({ product }: { product: ProductType }) {
  const dispatch = useDispatch();
  const productCurrentQty = useSelector(selectCurrentQuantityById(product.id));
  return (
    <article className="border-2 border-black px-4 py-8 rounded-lg flex gap-10 relative mb-5">
      <button
        className="absolute top-3 right-3"
        onClick={() => dispatch(deleteItem(product.id))}
      >
        <i className="pi pi-times text-xl"></i>
      </button>
      <div>
        <img className="max-w-40" src={product.image} alt={product.title} />
      </div>
      <div>
        <h3 className="text-2xl font-semibold">{product.title}</h3>
        <p className="my-4 max-w-2xl">{product.description}</p>
        <div className="flex items-center gap-10">
          <h3 className="font-semibold text-2xl">${product?.price}</h3>
          <div className="flex text-center">
            <button
              className="focus:outline-none focus:ring focus:ring-stone-800 border-2 border-black w-12 h-12 transition-colors hover:bg-black hover:text-white"
              onClick={() => dispatch(increaseItemQuantity(product.id))}
            >
              <i className="pi pi-plus font-semibold"></i>
            </button>
            <span className="border-2 border-black font-semibold flex items-center justify-center border-x-0 w-12 h-12">
              {productCurrentQty}
            </span>
            <button
              className="focus:outline-none focus:ring focus:ring-stone-800 border-2 border-black w-12 h-12 transition-colors hover:bg-black hover:text-white"
              onClick={() => dispatch(decreaseItemQuantity(product.id))}
            >
              <i className="pi pi-minus font-semibold"></i>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
