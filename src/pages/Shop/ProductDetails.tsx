import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

interface Product {
  img: string;
  price: number;
  name: string;
  long_description?: string;
  long_desc?: string;
  short_desc?: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://happy-cart-server.vercel.app/all-products/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();

    return () => {};
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="hero  bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={product.img} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">{product.name}</h1>
            <h1 className="text-xl font-semi-bold my-3">
              Price : {product.price}/kg
            </h1>
            <p className="py-6">
              <span className="text-green-500 text-xl">Description : </span>
              {product.long_description ||
                product.long_desc ||
                product.short_desc}
            </p>

            <Link to="/shop">
              {" "}
              <button className="btn bg-blue-500 text-white font-semibold">
                Back to shop
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
