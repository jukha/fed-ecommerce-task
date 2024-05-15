import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product as ProductType } from "../../../types/Product";
import { getAllProducts } from "../../../services/apiProduct";

function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center text-5xl font-semibold mt-10 ">Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-center mt-8">
          {products.map((product) => (
            <li key={product.id}>
              <Link
                to={`${product.id}`}
                className="border block border-gray-600 rounded-md"
              >
                <div className="overflow-hidden rounded-[inherit]">
                  <img
                    className="w-full h-80 object-cover mx-auto transition-transform hover:scale-110"
                    src={product.image}
                    alt=""
                  />
                </div>
                <div className="p-4">
                  <h2 className="my-4 text-xl font-semibold truncate">
                    {product.title}
                  </h2>
                  <p>Price: ${product.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Products;
