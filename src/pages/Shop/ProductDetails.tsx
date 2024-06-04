import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id, } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/all-products/${id}`
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
          <img
            src={product.img}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{product.name}</h1>
            <h1 className="text-xl font-semi-bold my-3">Price : {product.price}/kg</h1>
            <p className="py-6"><span className="text-green-500 text-xl">Description : </span>
           {product.long_description || product.long_desc || short_desc}
            </p>
           <Link to="/shop"> <button className="btn bg-blue-500 text-white font-semibold">Back to shop</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
