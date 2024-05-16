import { useEffect, useState } from "react";
import { getProductById } from "../../../services/apiProduct";
import Loader from "../../../ui/Loader";
import { Product as ProductType } from "../../../types/Product";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCart, selectItemById } from "../cart/cartSlice";
import { toast } from "react-toastify";

function Product() {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector(selectCart);
  const location = useLocation();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const currentItemInCart = productId
    ? useSelector(selectItemById(productId))
    : null;

  function handleAddToCart() {
    let toastMsg = "";
    if (currentItemInCart) toastMsg = `${product?.title} updated in cart`;
    else toastMsg = `${product?.title} added to cart`;
    const newItem: ProductType = {
      id: product!.id,
      title: product!.title,
      price: product!.price,
      description: product!.description,
      image: product!.image,
      quantity,
      totalPrice: product!.price * quantity,
    };
    toast.success(toastMsg);
    dispatch(addItem(newItem));
  }

  function handleQtyIncrement() {
    setQuantity((prevQty) => prevQty + 1);
  }

  function handleQtyDecrement() {
    setQuantity((prevQty) => {
      if (prevQty === 1) return 1;
      else return prevQty - 1;
    });
  }

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productId = Number(location.pathname.split("/").pop());
        const data = await getProductById(productId);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProductDetails();
  }, []);
  if (loading) return <Loader />;
  else
    return (
      <div className="flex gap-10 justify-between">
        <div className="w-3/12">
          <img className="max-w-96" src={product?.image} alt="" />
        </div>
        <div className="w-2/3">
          <h1 className="text-4xl font-semibold">{product?.title}</h1>
          <p className="max-w-2xl my-4">{product?.description}</p>
          <h3 className="font-semibold text-2xl">${product?.price}</h3>
          <div className="flex text-center my-10">
            <button
              className="focus:outline-none focus:ring focus:ring-stone-800 border-2 border-black w-12 h-12 transition-colors hover:bg-black hover:text-white"
              onClick={handleQtyIncrement}
            >
              <i className="pi pi-plus font-semibold"></i>
            </button>
            <span className="border-2 border-black font-semibold flex items-center justify-center border-x-0 w-12 h-12">
              {quantity}
            </span>
            <button
              className="focus:outline-none focus:ring focus:ring-stone-800 border-2 border-black w-12 h-12 transition-colors hover:bg-black hover:text-white"
              onClick={handleQtyDecrement}
            >
              <i className="pi pi-minus font-semibold"></i>
            </button>
          </div>
          <button
            className="bg-black text-white rounded-md p-4 block focus:outline-none focus:ring focus:ring-stone-800 "
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    );
}

export default Product;
